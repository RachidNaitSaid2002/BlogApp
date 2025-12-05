from passlib.context import CryptContext
from jose import jwt, JWTError
from dotenv import load_dotenv
from Database.db import engine,SessionLocal,Base
from fastapi import FastAPI, HTTPException, status, Depends
from Models.Articles import Articles
from Models.Users import User
from Schemas.article import ArticleBase, ArticleIn, ArticleOut
from Schemas.user import UserCreate,UserLogin
from fastapi.security import HTTPBearer, HTTPBasicCredentials
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

# Hashed Password ------------------------------------------------------------ :
pwd_context = CryptContext(schemes=["argon2"])

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# User auth ------------------------------------------------------------------ :
def get_uer(db, email : str):
    db_user = db.query(User).filter(User.email == email).first()
    if db_user:
        return db_user
    return None

# JWT ------------------------------------------------------------------------- :
def create_jwt(email : str):
    payload = {'sub': email}
    encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_jwt(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email : str = payload.get("sub")
        if email is None:
            raise JWTError
        return email
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalide authentificate credentials"
        )
    