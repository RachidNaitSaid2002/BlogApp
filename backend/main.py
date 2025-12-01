from Database.db import engine,SessionLocal,Base
from fastapi import FastAPI, HTTPException, status, Depends
from Models.Articles import Articles
from Models.Users import User
from Schemas.article import ArticleBase, ArticleIn, ArticleOut
from Schemas.user import UserCreate,UserOut,UserLogin
from fastapi.security import HTTPBearer, HTTPBasicCredentials
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from auth.auth import get_password_hash, get_uer, verify_jwt, create_jwt, verify_password
from Utils.Get_resum import Get_Resum

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
bearer_scheme = HTTPBearer()

Base.metadata.create_all(engine)
app = FastAPI()
db=SessionLocal()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],    
)

# SignUp --------------------------------------------------------------------- :
@app.post('/signup')
def Signup(user: UserCreate):
    db_user = get_uer(db, user.email)
    if db_user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail='Email Already exist !!')
    pass_hached = get_password_hash(user.hashed_password)
    db_user = User(username=user.username, email=user.email, full_name=user.full_name, hashed_password=pass_hached)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {'message':'User Register Successfully'}


# Login ----------------------------------------------------------------------- :
@app.post('/login')
async def login(user: UserLogin):
    db_user = get_uer(db, user.email)
    if db_user:
        verify_pass = verify_password(user.hashed_password, db_user.hashed_password)
        if verify_pass:
            token = create_jwt(user.email)
            return { 'access_token':token, 'token_type': "bearer", "user_id": db_user.id }
        else:
            return  {'message':'Password incorrect !!'}
    return {'message':'Username ou Password incorrect !!'}

# Predict ---------------------------------------------------------------------- :
@app.post('/Summary')
async def summary(article: str):
    summary, classe, mode = Get_Resum(article)
    return summary


