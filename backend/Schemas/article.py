from pydantic import BaseModel
from datetime import datetime

class ArticleBase(BaseModel):
    ton: str
    resume: str
    class_name: str
    article: str

class ArticleOut(ArticleBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class ArticleIn(BaseModel):
    article: str
    Creativite_level:float
    Thinking:int





