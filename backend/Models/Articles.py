from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Column, Integer, String, Text, DateTime
from Database.db import Base
from datetime import datetime

class Articles(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    article = Column(Text, nullable=False)
    class_name = Column(String(100), nullable=False)
    resume = Column(Text, nullable=False)
    ton = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # ForeignKey: user.id
    user_id = Column(Integer, ForeignKey("users.id"))

    # Relation
    owner = relationship("User", back_populates="articles")