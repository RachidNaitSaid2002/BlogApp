from Utils.Get_ClassName import GetClassnames
from google import genai
from dotenv import load_dotenv
from pydantic import BaseModel, Field
import os


load_dotenv()

def Get_Resum(Article_txt):

    key = os.getenv('google_api')

    client = genai.Client(api_key=key)

    Classe = GetClassnames(Article_txt)

    class DataModel(BaseModel):
        summary:str = Field(description='Resume of article')
        classe:str = Field(description='Class')
        mode:str = Field(description='Mode (positive or negative or neutral)')

    prompt_text = f"""
        Resume this article: "{Article_txt}",
        Class: "{Classe}",
        Predict Mode of this article (positive or negative or neutral).
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt_text,
        config={
            "response_mime_type": "application/json",
            "response_json_schema": DataModel.model_json_schema(),
        }
    )

    data = DataModel.model_validate_json(response.text)
    summary = data.summary
    classe = data.classe
    mode = data.mode

    return summary, classe, mode


if __name__ == '__main__':
    print(Get_Resum("Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!"))