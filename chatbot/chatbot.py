# from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_openai import OpenAIEmbeddings, ChatOpenAI
# from langchain_community.vectorstores import FAISS 
# from dotenv import load_dotenv
# from langchain_community.vectorstores.utils import DistanceStrategy 
# from langchain_core.prompts import ChatPromptTemplate 
# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.runnables import RunnablePassthrough

# load_dotenv()   
# loader = DirectoryLoader(
#     path="./data",
#     glob= "**/*.pdf",
#     loader_cls=PyPDFLoader,
#     show_progress=True,
#     use_multithreading=True
#     )
# docs = loader.load()
# MARKDOWN_SEPARATORS = ["\n#{1,6}", "```\n", "\n\n", "\n", " ", "",]
# text_splitter = RecursiveCharacterTextSplitter(
#     chunk_size=1200,
#     chunk_overlap=200,
#     add_start_index= True,
#     strip_whitespace= True,
#     separators= MARKDOWN_SEPARATORS,
# )
# splits = text_splitter.split_documents(docs)

# embedding = OpenAIEmbeddings(model="text-embedding-3-small")
# vectorstores = FAISS.from_documents(
#      documents=splits,
#      embedding=embedding,
#     distance_strategy=DistanceStrategy.COSINE,
# )
# retriever = vectorstore.as_retriever(
#     search_type= "similarity_score_threshold",
#     search_kwargs= {"k" : 5, "score_threshold": 0.2}     
# )

# template = (
#     "You are a strict, citation-focused assistant for a private knowledge base. \n"
#     "RULES: \n"
#     "1) Use ONLY the provided context to answer. \n"
#     "2) If the answer is not clearly contained in the context, say: "
#     "\"I don't know based on the provided documents. \"\n"
#     "3) Do NOT use outside knowledge, guessing, or web information. \n"
#     "4) If applicable, cite sources as (source:page) using the metadata. \n\n"
#     "Context:\n{context}\n\n"
#     "Question: {question}"
# )
# prompt = ChatPromptTemplate.from_template(template)

# llm = ChatOpenAI(
#     model= "gpt-5-mini",
#     temperature = 0
# )

# rag_chain =(
#     {"context": retriever, "question": RunnablePassthourgh()
#     | prompt 
#     | llm
#     | StrOutputParser()
#     }
# )
# question = input ("Question: ")

# answer =rag_chain.invoke(question)

# print(answer)
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv
from langchain_community.vectorstores.utils import DistanceStrategy
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

load_dotenv()

# Load PDF
loader = DirectoryLoader(
    path="./data",
    glob="**/*.pdf",
    loader_cls=PyPDFLoader,
    show_progress=True,
    use_multithreading=True
)

docs = loader.load()

# Split text
MARKDOWN_SEPARATORS = ["\n#{1,6}", "```\n", "\n\n", "\n", " ", ""]
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1200,
    chunk_overlap=200,
    add_start_index=True,
    strip_whitespace=True,
    separators=MARKDOWN_SEPARATORS,
)

splits = text_splitter.split_documents(docs)

# Embedding
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Vector DB
vectorstore = FAISS.from_documents(
    documents=splits,
    embedding=embeddings,
    distance_strategy=DistanceStrategy.COSINE,
)

# Retriever
retriever = vectorstore.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={"k": 5, "score_threshold": 0.2}
)

# Prompt
template = (
    "You are a strict, citation-focused assistant for a private knowledge base.\n"
    "RULES:\n"
    "1) Use ONLY the provided context to answer.\n"
    "2) If the answer is not clearly contained in the context, say:\n"
    "\"I don't know based on the provided documents.\"\n"
    "3) Do NOT use outside knowledge.\n"
    "4) Cite sources if possible.\n\n"
    "Context:\n{context}\n\n"
    "Question: {question}"
)

prompt = ChatPromptTemplate.from_template(template)

# LLM
llm = ChatOpenAI(
    model="gpt-5-mini",
    temperature=0
)

# RAG chain
rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# Run
question = input("Question: ")
answer = rag_chain.invoke(question)

print(answer)