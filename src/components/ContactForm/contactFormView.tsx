import { Box, Button } from "@mui/material";
import ContactFormMenuBar from "./contactFormMenuBar";
import ContactFormDetails from "./contactFormDetails";
import { FormEvent, useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContactFormEmailTable from "./ContactFormDetailTable/contactFormEmailTable";
import ContactFormPhoneTable from "./ContactFormDetailTable/contactFormPhoneTable";
import { useDispatch } from "react-redux";
import { ContactItem } from "../../models/contactItem.model";
import { PhoneNumberGroup } from "../../models/phoneList.model";
import { EmailAddressGroup } from "../../models/emailAddress.model";
import { FocusEvent } from "react";
import { contactItemActions } from "../../store/contactItem.slice";
import { phoneNumberListActions } from "../../store/phoneNumberList.slice";
import { emailAddressListActions } from "../../store/emailAddressList.slice";
import { usePostContactItemMutation } from "../../services/contactItem.service";
import { AppDispatch } from "../../store/index";
import { invalidateTagsAcrossApis } from "../../services/sharedTagInvalidation.middleware";

const dateComparer = (dateObject: string): boolean => {
  const dob = new Date(dateObject).getTime();
  const currentDate = new Date().getTime();
  return dob > currentDate;
};

const convertDate = (dateObject: string): string => {
  const dob = new Date(dateObject);
  
  const year = dob.getFullYear();
  const month = (dob.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
  const day = dob.getDate().toString().padStart(2, '0');
  console.log(dob);
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate
}

const phoneNumberCheck = (phoneNumber: string): boolean => {
  const pattern = /^[0-9]+$/;
  if (phoneNumber) {
    return !pattern.test(phoneNumber.trim());
  }
  return false;
};

export type phoneNumberStateType = {
  [key: string]: boolean;
};

const getFromForm = (fd: FormData, value: string) => {
  return fd.get(value)!.toString();
};

export type ContactGroupType = {
  newContact: ContactItem;
  newPhoneGroup: PhoneNumberGroup;
  newEmailGroup: EmailAddressGroup;
};

const createContactGroup = (
  fd: FormData,
  isFavorite: boolean,
  isEditing: boolean,
  id: string
): ContactGroupType => {
  const randomInt = isEditing ? parseInt(id) : Math.floor(Math.random() * (10000 + 1));
  const newContact: ContactItem = {
    id: randomInt,
    fName: getFromForm(fd, "fName"),
    lName: getFromForm(fd, "lName"),
    email: `email${randomInt}`,
    phone: `phone${randomInt}`,
    address: getFromForm(fd, "address"),
    dob: convertDate(getFromForm(fd, "dob")),
    isFav: isFavorite,
    url: getFromForm(fd, "url"),
  };
  const newPhoneGroup: PhoneNumberGroup = {
    id: `phone${randomInt}`,
    home: getFromForm(fd, "home-number"),
    work: getFromForm(fd, "work-number"),
    main: getFromForm(fd, "main-number"),
    other: getFromForm(fd, "other-number"),
  };
  const newEmailGroup: EmailAddressGroup = {
    id: `email${randomInt}`,
    personal: getFromForm(fd, "personal-email"),
    work: getFromForm(fd, "work-email"),
  };
  return { newContact, newPhoneGroup, newEmailGroup };
};

const checkPhoneInputError = (phoneInputState: phoneNumberStateType) => {
  return Object.values(phoneInputState).some((item) => item);
};

const ContactFormView: React.FC = () => {
  const editStatus = useLocation().pathname.includes("edit");
  const {id} = useParams()
  const [postContactItem] = usePostContactItemMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [favContact, setFavContact] = useState(false);
  const [dobInputError, setDobInputError] = useState(false);
  const [phoneInputError, setPhoneInputError] = useState({
    home: false,
    work: false,
    main: false,
    other: false,
  });

  const handleFavoriteContact = useCallback(() => {
    setFavContact((prevState) => {
      return !prevState;
    });
  }, []);

  const handlePhoneInputState = (
    phoneType: string,
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const phoneInputValue = event.target.value;
    setPhoneInputError((prevState) => {
      return {
        ...prevState,
        [phoneType]: phoneNumberCheck(phoneInputValue),
      };
    });
  };

  const handleDobInputState = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const dobInputValue = event.target.value;
    setDobInputError(dateComparer(dobInputValue));
  };

  const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    if (!dobInputError && !checkPhoneInputError(phoneInputError)) {
      const { newContact, newPhoneGroup, newEmailGroup } = {
        ...createContactGroup(fd, favContact,editStatus, id!),
      };
      dispatch(contactItemActions.contactItemUpsertOne(newContact));
      dispatch(phoneNumberListActions.phoneNumberListUpsertOne(newPhoneGroup));
      dispatch(emailAddressListActions.emailAddressListUpsertOne(newEmailGroup));
      await postContactItem({ newContact, newPhoneGroup, newEmailGroup });
      await dispatch(invalidateTagsAcrossApis());
      navigate(`/${newContact.id}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
      <ContactFormMenuBar isEditing={editStatus}></ContactFormMenuBar>
      <form className="form-control" onSubmit={submitFormHandler}>
        <ContactFormDetails
          handleFavContact={handleFavoriteContact}
          favContactState={favContact}
          dobErrorState={dobInputError}
          dobInputState={handleDobInputState}
          isEditing={editStatus}
        ></ContactFormDetails>
        <Box display="flex" gap="5rem" p="1rem 3rem">
          <ContactFormPhoneTable
            isEditing={editStatus}
            handlePhoneState={handlePhoneInputState}
            phoneNumberState={phoneInputError}
          ></ContactFormPhoneTable>
          <ContactFormEmailTable isEditing={editStatus}></ContactFormEmailTable>
        </Box>
        <Box display="flex" gap="5rem" p="1rem 3rem"></Box>
        <div className="form-submit-button-container">
          <Button variant="contained" type="submit">
            {editStatus ? 'Save' : 'Add'}
          </Button>
          <Button variant="outlined" type="reset" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default ContactFormView;
