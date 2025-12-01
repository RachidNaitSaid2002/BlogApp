import os
import requests
from dotenv import load_dotenv

load_dotenv()

def GetClassnames(Article):
    API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli"
    headers = {
        "Authorization": f"Bearer {os.getenv('HF_TOKEN')}",
    }

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    output = query({
        "inputs": Article,
        "parameters": {"candidate_labels": ["refund", "legal", "faq"]},
    })

    Class = output[0]['label']

    return Class, Article