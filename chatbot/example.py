from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv
load_dotenv()
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

vector = embeddings.embed_query("tran huu hoang minh")
print(vector)
print(len(vector))