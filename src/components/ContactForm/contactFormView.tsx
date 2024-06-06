import { Box, Button, Stack } from "@mui/material";
import ContactFormMenuBar from "./contactFormMenuBar";
import ContactFormDetails from "./contactFormDetails";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContactFormEmailTable from "./ContactFormDetailTable/contactFormEmailTable";
import ContactFormPhoneTable from "./ContactFormDetailTable/contactFormPhoneTable";
import { useDispatch, useSelector } from "react-redux";
import { ContactItem } from "../../models/contactItem.model";
import { PhoneNumberGroup } from "../../models/phoneList.model";
import { EmailAddressGroup } from "../../models/emailAddress.model";
import { FocusEvent } from "react";

import {
  contactItemActions,
  selectContactById,
} from "../../store/contactItem.slice";
import { usePostContactItemMutation } from "../../services/contactItem.service";
import { AppDispatch, RootState } from "../../store/index";
import { invalidateTagsAcrossApis } from "../../services/sharedTagInvalidation.middleware";
import {
  convertDate,
  getDobValue,
  phoneNumberCheck,
  dateComparer,
} from "../../utils/contactAndDateFormatters";
import { useGetEmailAddressListByIdQuery } from "../../services/emailAddressList.service";
import { useGetPhoneNumberListByIdQuery } from "../../services/phoneNumberList.service";

export type phoneNumberStateType = {
  home: boolean;
  work: boolean;
  main: boolean;
  other: boolean;
};

export type formStateType = {
  contact: ContactItem;
  phoneGroup: PhoneNumberGroup;
  emailGroup: EmailAddressGroup;
}

const createContactGroup = (
  formState: formStateType,
  isEditing: boolean,
  id: string
): formStateType => {
  const randomInt = isEditing
    ? parseInt(id)
    : Math.floor(Math.random() * (10000 + 1));
  const contact: ContactItem = formState.contact;
  contact.id = randomInt;
  contact.dob =
    formState.contact.dob === ""
      ? formState.contact.dob
      : convertDate(formState.contact.dob);
  const phoneGroup: PhoneNumberGroup = formState.phoneGroup;
  phoneGroup.id = `phone${randomInt}`;
  const emailGroup: EmailAddressGroup = formState.emailGroup;
  emailGroup.id = `email${randomInt}`;
  return { contact, phoneGroup, emailGroup };
};

const checkPhoneInputError = (phoneInputState: phoneNumberStateType) => {
  return Object.values(phoneInputState).some((item) => item);
};

const ContactFormView: React.FC = () => {
  const editStatus = useLocation().pathname.includes("edit");
  const { id } = useParams();
  const [postContactItem] = usePostContactItemMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [dobInputError, setDobInputError] = useState(false);
  const [phoneInputError, setPhoneInputError] = useState({
    home: false,
    work: false,
    main: false,
    other: false,
  });

  const [formState, setFormState] = useState<formStateType>({
    contact: {
      id: 0,
      fName: "",
      lName: "",
      email: "",
      phone: "",
      dob: "",
      isFav: false,
      address: "",
      url: "",
    },
    phoneGroup: {
      id: "",
      home: "",
      work: "",
      main: "",
      other: "",
    },
    emailGroup: {
      id: "",
      personal: "",
      work: "",
    },
  });

  const handleFavoriteContact = () => {
    setFormState((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        isFav: !prevState.contact.isFav,
      },
    }));
  };

  const isLoading = useSelector(
    (state: RootState) => state.contactItem.isLoading
  );

  const contactDataById = useSelector((state: RootState) =>
    selectContactById(state, parseInt(id!))
  );

  const {data: emailDataById} = useGetEmailAddressListByIdQuery(id!)

  const {data: phoneNumberById} = useGetPhoneNumberListByIdQuery(id!)

  useEffect(() => {
    if (!isLoading && editStatus) {
      setFormState((prevState) => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          ...contactDataById,
          dob: getDobValue(contactDataById.dob),
        },
        phoneGroup: {
          ...prevState.phoneGroup,
          ...phoneNumberById,
        },
        emailGroup: {
          ...prevState.emailGroup,
          ...emailDataById,
        },
      }));
    }
  }, [isLoading, editStatus, contactDataById, phoneNumberById, emailDataById]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, inputGroup:string
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [inputGroup]: {
        ...prevState[inputGroup as keyof formStateType],
        [name]: value,
      },
    }));
  };

  const validatePhoneInput = (
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

  const validateDobInput = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const dobInputValue = event.target.value;
    setDobInputError(dateComparer(dobInputValue));
  };

  const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dobInputError && !checkPhoneInputError(phoneInputError)) {
      const { contact, phoneGroup, emailGroup } = {
        ...createContactGroup(formState, editStatus, id!),
      };
      dispatch(contactItemActions.contactItemUpsertOne(contact));
      await postContactItem({ contact, phoneGroup, emailGroup });
      await dispatch(invalidateTagsAcrossApis());
      navigate(`/${contact.id}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
      <ContactFormMenuBar isEditing={editStatus}></ContactFormMenuBar>
      <form className="form-control" onSubmit={submitFormHandler}>
        <ContactFormDetails
          handleFavContact={handleFavoriteContact}
          dobErrorState={dobInputError}
          validateDob={validateDobInput}
          handleInputChange={handleInputChange}
          contact={formState.contact}
          isLoading={isLoading}
        ></ContactFormDetails>
        <Stack direction={{ sm: "column", md: "row" }} gap="5rem" p="1rem 3rem">
          <ContactFormPhoneTable

            validatePhoneNumbers={validatePhoneInput}
            handleInputChange={handleInputChange}
            phoneNumberState={phoneInputError}
            phoneGroup={formState.phoneGroup}
            isLoading={isLoading}
          ></ContactFormPhoneTable>
          <ContactFormEmailTable
            handleInputChange={handleInputChange}
            emailGroup={formState.emailGroup}
            isLoading={isLoading}
          ></ContactFormEmailTable>

        </Stack>
        <Box display="flex" gap="5rem" p="1rem 3rem"></Box>
        <div className="form-submit-button-container">
          <Button variant="contained" type="submit">
            {editStatus ? "Save" : "Add"}
          </Button>
          <Button variant="outlined" type="reset" onClick={() => navigate("..", {relative: "path"})}>
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default ContactFormView;
