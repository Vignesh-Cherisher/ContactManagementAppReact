import { Box, Button } from "@mui/material";
import ContactFormMenuBar from "./contactFormMenuBar";
import ContactFormDetails from "./contactFormDetails";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactFormEmailTable from "./ContactFormDetailTable/contactFormEmailTable";
import ContactFormPhoneTable from "./ContactFormDetailTable/contactFormPhoneTable";
import { useDispatch } from "react-redux";
import { ContactItem } from "../../models/contactItem.model";
import { PhoneNumberGroup } from "../../models/phoneList.model";
import { EmailAddressGroup } from "../../models/emailAddress.model";
import  { contactItemActions } from "../../store/contactItem.slice";
import { phoneNumberListActions } from "../../store/phoneNumberList.slice";
import { emailAddressListActions } from "../../store/emailAddressList.slice";
import { usePostContactItemMutation } from "../../services/contactItem.service";
import { AppDispatch } from '../../store/index';
import { invalidateTagsAcrossApis } from "../../services/sharedTagInvalidation.middleware";

const dateComparer = (dateObject: string): boolean => {
  const dob = new Date(dateObject).getTime();
  const currentDate = new Date().getTime();
  return dob > currentDate;
};

const phoneNumberCheck = (phoneNumber: string): boolean => {
  const pattern = /^[0-9]+$/;
  if (phoneNumber) {
    return !pattern.test(phoneNumber.trim());
  }
  return false;
};

const getPhoneNumberInputs = (fd: FormData): string[] => {
  const resultArray: string[] = [];
  Object.entries(Object.fromEntries(fd.entries())).forEach((element) => {
    if (element[0].includes("-number")) {
      resultArray.push(element[1].toString());
    }
  });
  return resultArray;
};

export type phoneNumberStateType = {
  [key: string]: boolean;
};

const getFromForm = (fd:FormData, value: string) => {
  return fd.get(value)!.toString()
}

export type ContactGroupType = {
  newContact: ContactItem,
  newPhoneGroup: PhoneNumberGroup,
  newEmailGroup: EmailAddressGroup
}

const createContactGroup = (fd: FormData, isFavorite: boolean): ContactGroupType => {
  const randomInt = Math.floor(Math.random() * (10000 + 1))
  const newContact:ContactItem = {
    id: randomInt,
    fName: getFromForm(fd,"fName"),
    lName: getFromForm(fd,"lName"),
    email: `email${randomInt}`,
    phone: `phone${randomInt}`,
    address: getFromForm(fd, "address"),
    dob: getFromForm(fd, "dob"),
    isFav: isFavorite,
    url: getFromForm(fd, "url")
  }
  const newPhoneGroup: PhoneNumberGroup = {
    id: `phone${randomInt}`,
    home: getFromForm(fd, "home-number"),
    work: getFromForm(fd, "work-number"),
    main: getFromForm(fd, "main-number"),
    other: getFromForm(fd, "other-number")
  }
  const newEmailGroup: EmailAddressGroup = {
    id: `email${randomInt}`,
    personal: getFromForm(fd, "personal-email"),
    work: getFromForm(fd, "work-email"),
  }
  return {newContact, newPhoneGroup, newEmailGroup}
}

const checkPhoneInputError = (phoneInputState: phoneNumberStateType) => {
  return Object.values(phoneInputState).every((item) => item)
}

const ContactFormView: React.FC = () => {
  const [postContactItem] = usePostContactItemMutation()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const [favContact, setFavContact] = useState(false);
  const [dobInputError, setDobInputError] = useState(false);
  const [phoneInputError, setPhoneInputError] = useState({
    home: false,
    work: false,
    main: false,
    other: false,
  });

  const handleFavoriteContact = () => {
    setFavContact((prevState) => {
      return !prevState
    });
  };

  const submitFormHandler = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const dobInput = fd.get("dob") as string;
    const phoneNumberArray = getPhoneNumberInputs(fd);
    setPhoneInputError(() => {
      const newState = {
        home: phoneNumberCheck(phoneNumberArray[0]),
        work: phoneNumberCheck(phoneNumberArray[1]),
        main: phoneNumberCheck(phoneNumberArray[2]),
        other: phoneNumberCheck(phoneNumberArray[3]),
      };
      return newState;
    });
    setDobInputError(dateComparer(dobInput));
    if (!dobInputError && !checkPhoneInputError(phoneInputError)) {
      const {newContact, newPhoneGroup, newEmailGroup} = {...createContactGroup(fd, favContact)}
      dispatch(contactItemActions.contactItemAddOne(newContact))
      dispatch(phoneNumberListActions.phoneNumberListAddOne(newPhoneGroup))
      dispatch(emailAddressListActions.emailAddressListAddOne(newEmailGroup))
      await postContactItem({newContact, newPhoneGroup, newEmailGroup})
      await dispatch(invalidateTagsAcrossApis())
      navigate(`/${newContact.id}`)
    }
  };

  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
      <ContactFormMenuBar></ContactFormMenuBar>
      <form className="form-control" onSubmit={submitFormHandler}>
        <ContactFormDetails
          handleFavContact={handleFavoriteContact}
          favContactState={favContact}
          dobErrorState={dobInputError}
        ></ContactFormDetails>
        <Box display="flex" gap="5rem" p="1rem 3rem">
          <ContactFormPhoneTable
            phoneNumberState={phoneInputError}
          ></ContactFormPhoneTable>
          <ContactFormEmailTable></ContactFormEmailTable>
        </Box>
        <Box display="flex" gap="5rem" p="1rem 3rem"></Box>
        <div className="form-submit-button-container">
          <Button variant="contained" type="submit">
            Add
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
