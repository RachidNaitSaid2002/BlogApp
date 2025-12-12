import os
import requests
from dotenv import load_dotenv

load_dotenv()

def GetClassnames(Article):
    API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli"
    headers = {
        "Authorization": f"Bearer {os.getenv('HF_TOKEN')}",
    }

    types = [
        "support",
        "billing",
        "payment",
        "account",
        "security",
        "privacy",
        "shipping",
        "returns",
        "warranty",
        "troubleshooting",
        "setup",
        "onboarding",
        "cancellation",
        "subscription",
        "updates",
        "feedback",
        "promotions",
        "technical",
        "authentication",
        "compliance",
        "guidelines",
        "documentation",
        "contact",
        "analytics",
        "performance",
        "optimization",
    ]

    payload = {
        "inputs": Article,
        "parameters": {"candidate_labels": types},
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        raise ValueError(f"HuggingFace API error: {response.status_code}, {response.text}")

    output = response.json()

    # output is a list: [{"label": "...", "score": ...}, ...]
    return output[0]["label"]

if __name__ == '__main__':
    print(GetClassnames("I need help with my account billing and payment issues."))
