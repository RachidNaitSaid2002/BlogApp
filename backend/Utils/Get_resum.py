from Get_ClassName import GetClassnames
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

key = os.getenv('google_api')

client = genai.Client(api_key=key)

Classe, Article = GetClassnames("Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="How does AI work?"
)
print(response.text)