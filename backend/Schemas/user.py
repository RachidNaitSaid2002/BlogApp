from typing import Optional
from pydantic import BaseModel
from typing import List
from Schemas.article import ArticleOut

class UserBase(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    hashed_password: str

    class Config:
        orm_mode = True

class UserOut(UserBase):
    id: int
    active: bool
    predictions: List[ArticleOut] = []

    class Config:
        orm_mode = True

    
class UserLogin(BaseModel):
    email: str
    hashed_password:str

    class Config:
        orm_mode = True