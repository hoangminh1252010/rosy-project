from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_community.vectorstores.utils import DistanceStrategy
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

def build_rag_chain(data_path: str = "./data"):
    loader = DirectoryLoader(
        path=data_path,
        glob="**/*.pdf",
        loader_cls=PyPDFLoader,
        show_progress=True,
        use_multithreading=True
    )
    docs = loader.load()

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

    retriever = vectorstore.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={"k": 3, "score_threshold": 0.33}
    )

    prompt = ChatPromptTemplate.from_template(
        """You are a strict, citation-focused assistant for ROSY knowledge base.
RULES:
1) Use ONLY the provided context.
2) If context is insufficient, say you don't know.
3) Do NOT guess.
4) If possible, cite source.
Context:
{context}

Question: {question}"""
    )

    llm = ChatOpenAI(model="gpt-5-mini", temperature=0)

    rag_chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    return rag_chain

    