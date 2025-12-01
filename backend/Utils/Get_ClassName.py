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
        "integration",
        "features",
        "permissions",
        "reporting",
        "maintenance",
        "inventory",
        "messaging",
        "notifications",
        "accessibility",
        "customization",
        "automation",
        "auditing",
        "governance",
        "roadmap",
        "community",
        "moderation",
        "deployment",
        "backup",
        "migration",
        "monitoring",
        "verification",
        "policies",
        "training",
        "insights"
    ]

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    output = query({
        "inputs": Article,
        "parameters": {"candidate_labels": types},
    })

    Class = output[0]['label']

    return Class

