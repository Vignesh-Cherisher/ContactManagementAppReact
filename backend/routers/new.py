def create_contact(db: db_dependency, post_request = Depends(get_form_data), profile_image: UploadFile = File(...)):
  request_contact = post_request.contact
  return request_contact
  # contact_model = db.query(Contacts).filter(Contacts.id == request_contact.id).first()
  # if not contact_model:
  #   contact_model = process_contact_model(Contacts(**post_request.contact.model_dump()), profile_image)
  #   phone_model = Phones(**post_request.phoneGroup.model_dump())
  #   email_model = Emails(**post_request.emailGroup.model_dump())
  #   email_model.id = request_contact.email
  #   phone_model.id = request_contact.phone
  # else:
  #   phone_model = db.query(Phones).filter(Phones.id == request_contact.phone).first()
  #   email_model = db.query(Emails).filter(Emails.id == request_contact.email).first()
  #   update_model(contact_model, request_contact.model_dump())
  #   update_model(phone_model, post_request.phoneGroup.model_dump())
  #   update_model(email_model, post_request.emailGroup.model_dump())
  
  # db.add(phone_model)
  # db.add(email_model)
  # db.add(contact_model)
  
  # try:
  #       db.commit()
  # except Exception as e:
  #       db.rollback()
  #       raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
  # return contact_model

{           "id": 123,           "fName": "example",           "lName": "user",           "email": "email123",           "phone": "phone123",           "dob": "01-01-1999",           "isFav": False,           "address": "example, user,  address",           "url": "https://example/user/profile/picture/url"         }