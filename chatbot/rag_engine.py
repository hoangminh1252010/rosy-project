import os
from pathlib import Path

from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_community.vectorstores.utils import DistanceStrategy
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

_CHAT_MODEL = os.getenv("OPENAI_CHAT_MODEL", "gpt-4o-mini")


def _build_fallback_chain():
    """General fallback chain khi không có context tài liệu phù hợp."""
    prompt = ChatPromptTemplate.from_template(
        """Bạn là trợ lý AI tiếng Việt, trả lời tự nhiên và trung lập.
Nhiệm vụ:
- Trả lời ngắn gọn, rõ ràng theo kiến thức chung.
- KHÔNG tự giới thiệu Rosysoft hoặc chèn quảng bá nếu người dùng không hỏi về ROSY.
- Chỉ nhắc Rosysoft khi câu hỏi liên quan trực tiếp đến ROSY/ERP ROSY/sản phẩm-dịch vụ ROSY.
- Nếu người dùng hỏi giá/báo giá hoặc muốn tư vấn triển khai cho ROSY, nhắc họ có thể gõ "báo giá" để được ghi nhận.
- Không bịa thông tin nội bộ, pháp lý, hợp đồng hoặc cam kết giá cụ thể.

Câu hỏi: {question}"""
    )
    llm = ChatOpenAI(model=_CHAT_MODEL, temperature=0.3)
    chain = (
        {"question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    return chain


def build_general_chain():
    """Chain trả lời general AI (không dùng context tài liệu)."""
    return _build_fallback_chain()


def build_rag_chain(data_path: str = "./data"):
    """
    Xây pipeline RAG từ PDF trong `data_path`.
    Nếu không có file PDF: dùng fallback (chat thuần, không vector store).
    """
    data_dir = Path(data_path)
    pdf_files = list(data_dir.glob("**/*.pdf")) if data_dir.is_dir() else []
    if not pdf_files:
        return _build_fallback_chain()

    loader = DirectoryLoader(
        path=str(data_dir),
        glob="**/*.pdf",
        loader_cls=PyPDFLoader,
        show_progress=True,
        use_multithreading=True,
    )
    docs = loader.load()
    if not docs:
        return _build_fallback_chain()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1200,
        chunk_overlap=200,
        separators=["\n#{1,6}", "```\n", "\n\n", "\n", " ", ""],
        add_start_index=True,
        strip_whitespace=True,
    )
    splits = splitter.split_documents(docs)

    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    vectorstore = FAISS.from_documents(
        documents=splits,
        embedding=embeddings,
        distance_strategy=DistanceStrategy.COSINE,
    )

    # Dùng top-k similarity thay vì similarity_score_threshold:
    # Với FAISS + COSINE và nhiều PDF, điểm relevance có thể âm / ngoài [0,1],
    # khiến bộ lọc threshold loại hết chunk → context rỗng → bot chỉ trả "không biết".
    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 6},
    )

    prompt = ChatPromptTemplate.from_template(
        """You are a strict, citation-focused assistant for ROSY knowledge base.
RULES:
1) Use ONLY the provided context.
2) If context is insufficient, reply briefly in Vietnamese that you cannot answer from the documents (e.g. "Theo tài liệu hiện có, mình chưa có thông tin để trả lời chính xác.").
3) Do NOT guess or use outside knowledge.
4) If possible, cite source.
5) Answer in Vietnamese unless the user writes entirely in another language.

Context:
{context}

Question: {question}"""
    )

    llm = ChatOpenAI(model=_CHAT_MODEL, temperature=0)

    rag_chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    return rag_chain
