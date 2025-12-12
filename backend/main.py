from Database.db import engine,SessionLocal,Base
from fastapi import FastAPI, HTTPException, Response, status, Depends, Cookie
from Models.Articles import Articles
from Models.Users import User
from Schemas.article import ArticleBase, ArticleIn, ArticleOut
from Schemas.user import UserCreate, UserLogin
from fastapi.security import HTTPBearer, HTTPBasicCredentials
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from auth.auth import get_password_hash, get_uer, verify_jwt, create_jwt, verify_password
from Utils.Get_resum import Get_Resum
from fastapi.responses import JSONResponse

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
bearer_scheme = HTTPBearer()

Base.metadata.create_all(engine)
app = FastAPI()

app.router.redirect_slashes = False

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# SignUp --------------------------------------------------------------------- :
@app.post('/signup')
def Signup(user: UserCreate, db = Depends(get_db)):
    db_user = get_uer(db, user.email)
    if db_user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail='Email Already exist !!')
    pass_hached = get_password_hash(user.hashed_password)
    db_user = User(username=user.username, email=user.email, full_name=user.full_name, hashed_password=pass_hached)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {'message':'User Register Successfully'}


@app.post('/login')
async def login(user: UserLogin,  db = Depends(get_db)):
    db_user = get_uer(db, user.email)

    if not db_user:
        return JSONResponse(content={"message": "Username or Password incorrect !!"}, status_code=400)

    verify_pass = verify_password(user.hashed_password, db_user.hashed_password)

    if not verify_pass:
        return JSONResponse(content={"message": "Password incorrect !!"}, status_code=400)

    token = create_jwt(user.email)

    response = JSONResponse(
        content={
            "message": "Login Successfully", 
            "user_id": db_user.id,
            "username": db_user.username,
            "full_name": db_user.full_name,
            "email": db_user.email
        },
        status_code=200
    )

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,  
        samesite="lax"
    )

    return response

# Predict ---------------------------------------------------------------------- :
@app.post('/Summary')
async def summary(article:ArticleIn, access_token: str = Cookie(None), db = Depends(get_db)):
    if access_token is None:
        raise HTTPException(status_code=401, detail="No token found in cookies")
    email = verify_jwt(access_token)
    if not email:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail='Invalid Token or Expired Token')
    elif email:
        user = get_uer(db, email)
        if not user:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail='User Not Found')

        summary, class_name, ton = Get_Resum(article.article, article.Thinking, article.Creativite_level)

        db_article = Articles(
            ton=ton,
            resume=summary,
            class_name=class_name,
            article=article.article,
            user_id=user.id
        )

        db.add(db_article)
        db.commit()
        db.refresh(db_article)

        return (db_article)

# Historique ---------------------------------------------------------------------:
@app.get('/history')
async def history(access_token: str = Cookie(None), db = Depends(get_db)):
    if access_token is None:
        raise HTTPException(status_code=401, detail="No token found in cookies")
    
    email = verify_jwt(access_token)
    if not email:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail='Invalid Token or Expired Token')
    
    user = get_uer(db, email)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail='User Not Found')
    
    historique = db.query(Articles).filter(Articles.user_id == user.id).order_by(Articles.created_at.desc()).all()
    if not historique:
        return {'message':'No history for this user', 'articles': []}
    else:
        return {'articles': historique}
    

# Logout ----------------------------------------------------------------------- :
@app.post('/logout')
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {'message':'Logout Successfully'}

@app.get("/test-cookie")
def test_cookie(access_token: str = Cookie(None)):
    if access_token is None:
        return {"message": "No cookie found"}
    else:
        return {"cookie": access_token}
