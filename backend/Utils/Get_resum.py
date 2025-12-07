from .Get_ClassName import GetClassnames
from google import genai
from dotenv import load_dotenv
from pydantic import BaseModel, Field
import os
from google.genai import types


load_dotenv()

def Get_Resum(Article_txt,Thinking,Creativite_level):

    key = os.getenv('google_api')

    client = genai.Client(api_key=key)

    Classe = GetClassnames(Article_txt)

    class DataModel(BaseModel):
        summary:str = Field(description='Resume of article')
        classe:str = Field(description='Class')
        mode:str = Field(description='Mode (positive or negative or neutral)')

    prompt_text = f"""
        Resume this article: "{Article_txt}",
        Predict Mode of this article (positive or negative or neutral).
    """
    Role = f"""Entanque que expert: "{Classe}","""

    # Creativite_level => [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        config=types.GenerateContentConfig(
            system_instruction=Role,
            thinking_config=types.ThinkingConfig(thinking_budget=Thinking),
            temperature=Creativite_level, 
            response_mime_type = "application/json",
            response_json_schema = DataModel.model_json_schema(),
        ),
        contents=prompt_text
    )

    data = DataModel.model_validate_json(response.text)
    summary = data.summary
    classe = data.classe
    mode = data.mode

    return summary, classe, mode


if __name__ == '__main__':
    print(Get_Resum("Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!",1,0.8))