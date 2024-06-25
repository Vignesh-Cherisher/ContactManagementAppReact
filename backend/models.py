from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from database import Base

class Contacts(Base):
  __tablename__ = 'contacts'
  
  id = Column(Integer, primary_key=True, index=True)
  fName = Column(String)
  lName = Column(String)
  email = Column(String)
  phone = Column(String)
  dob = Column(String)
  isFav = Column(Boolean)
  address = Column(String)
  url = Column(String)
  
class Phones(Base):
  __tablename__ = 'phones'
  
  sno = Column(Integer, primary_key=True, index=True)
  home = Column(Integer)
  work = Column(Integer)
  main = Column(Integer)
  other = Column(Integer)
  id = Column(String, ForeignKey("contacts.id"))
  
class Emails(Base):
  __tablename__ = 'emails'
  
  sno = Column(Integer, primary_key=True)
  work = Column(String)
  personal = Column(String)
  id = Column(String, ForeignKey('contacts.id'))
