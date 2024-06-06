import { Box, Button, Stack } from "@mui/material";
import ContactFormMenuBar from "./contactFormMenuBar";
import ContactFormDetails from "./contactFormDetails";
<<<<<<< Updated upstream
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
=======
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
>>>>>>> Stashed changes
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContactFormEmailTable from "./ContactFormDetailTable/contactFormEmailTable";
import ContactFormPhoneTable from "./ContactFormDetailTable/contactFormPhoneTable";
import { useDispatch, useSelector } from "react-redux";
import { ContactItem } from "../../models/contactItem.model";
import { PhoneNumberGroup } from "../../models/phoneList.model";
import { EmailAddressGroup } from "../../models/emailAddress.model";
import { FocusEvent } from "react";
<<<<<<< Updated upstream
import { contactItemActions, selectContactById } from "../../store/contactItem.slice";
import { phoneNumberListActions } from "../../store/phoneNumberList.slice";
import { emailAddressListActions } from "../../store/emailAddressList.slice";
import { usePostContactItemMutation } from "../../services/contactItem.service";
import { AppDispatch, RootState } from "../../store/index";
import { invalidateTagsAcrossApis } from "../../services/sharedTagInvalidation.middleware";
import { convertDate, getDobValue, phoneNumberCheck, dateComparer } from "../../utils/contactAndDateFormatters";


=======
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
>>>>>>> Stashed changes

export type phoneNumberStateType = {
  home: boolean;
  work: boolean;
  main: boolean;
  other: boolean;
};

<<<<<<< Updated upstream
const getFromForm = (fd: FormData, value: string) => {
  return fd.get(value)!.toString();
};

export type ContactGroupType = {
  newContact: ContactItem;
  newPhoneGroup: PhoneNumberGroup;
  newEmailGroup: EmailAddressGroup;
=======
export type formStateType = {
  contact: ContactItem;
  phoneGroup: PhoneNumberGroup;
  emailGroup: EmailAddressGroup;
>>>>>>> Stashed changes
};

const createContactGroup = (
  fd: FormData,
  isFavorite: boolean,
  isEditing: boolean,
  id: string
): ContactGroupType => {
  const randomInt = isEditing
    ? parseInt(id)
    : Math.floor(Math.random() * (10000 + 1));
<<<<<<< Updated upstream
  const newContact: ContactItem = {
    id: randomInt,
    fName: getFromForm(fd, "fName"),
    lName: getFromForm(fd, "lName"),
    email: `email${randomInt}`,
    phone: `phone${randomInt}`,
    address: getFromForm(fd, "address"),
    dob: getFromForm(fd, "dob") ?? convertDate(getFromForm(fd, "dob")),
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
=======
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
>>>>>>> Stashed changes
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
  const [favContact, setFavContact] = useState(false);
  const [imageUrlValue, setImageUrlValue] = useState("");
  const [dobInputError, setDobInputError] = useState(false);
  const [phoneInputError, setPhoneInputError] = useState({
    home: false,
    work: false,
    main: false,
    other: false,
  });

  
  const [formState, setFormState] = useState<{
    contact: ContactItem;
    phoneGroup: PhoneNumberGroup;
    emailGroup: EmailAddressGroup;
  }>({
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
<<<<<<< Updated upstream
  
  const handleFavoriteContact = useCallback(() => {
=======

  const handleFavoriteContact = () => {
>>>>>>> Stashed changes
    setFormState((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        isFav: !prevState.contact.isFav,
<<<<<<< Updated upstream
      }
    }))
  }, []);
=======
      },
    }));
  };
>>>>>>> Stashed changes

  const isLoading = useSelector(
    (state: RootState) => state.contactItem.isLoading
  );
  const contactDataById = useSelector((state: RootState) =>
    selectContactById(state, parseInt(id!))
  );

<<<<<<< Updated upstream
=======
  const {data: emailDataById} = useGetEmailAddressListByIdQuery(id!)

  const {data: phoneNumberById} = useGetPhoneNumberListByIdQuery(id!)

>>>>>>> Stashed changes
  useEffect(() => {
    if (!isLoading && editStatus) {
      setFormState((prevState) => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          ...contactDataById,
          dob: getDobValue(contactDataById.dob),
        }
      }));
    }
<<<<<<< Updated upstream
  }, [isLoading, editStatus, contactDataById, handleFavoriteContact]);
=======
  }, [isLoading, editStatus, contactDataById, phoneNumberById, emailDataById]);
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  const handleEmailInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      emailGroup: {
        ...prevState.emailGroup,
        [name]: value,
      },
    }));
  };

  const handlePhoneInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      phoneGroup: {
        ...prevState.phoneGroup,
        [name]: value,
      },
    }));
  };



  const handlePhoneInputState = (
=======
  const validatePhoneInput = (
>>>>>>> Stashed changes
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

  const onImageUrlChange = useCallback((imgUrl: string) => {
    setImageUrlValue(imgUrl);
  }, []);

  const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    fd.append("url", imageUrlValue);
    if (!dobInputError && !checkPhoneInputError(phoneInputError)) {
      const { newContact, newPhoneGroup, newEmailGroup } = {
        ...createContactGroup(fd, favContact, editStatus, id!),
      };
<<<<<<< Updated upstream
      dispatch(contactItemActions.contactItemUpsertOne(newContact));
      dispatch(phoneNumberListActions.phoneNumberListUpsertOne(newPhoneGroup));
      dispatch(
        emailAddressListActions.emailAddressListUpsertOne(newEmailGroup)
      );
      await postContactItem({ newContact, newPhoneGroup, newEmailGroup });
=======
      dispatch(contactItemActions.contactItemUpsertOne(contact));
      await postContactItem({ contact, phoneGroup, emailGroup });
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          dobInputState={handleDobInputState}
          isEditing={editStatus}
=======
          validateDob={validateDobInput}
>>>>>>> Stashed changes
          handleInputChange={handleInputChange}
          contact={formState.contact}
          handleImageUrl={(imgUrl) => onImageUrlChange(imgUrl)}
        ></ContactFormDetails>
        <Stack direction={{ sm: "column", md: "row" }} gap="5rem" p="1rem 3rem">
          <ContactFormPhoneTable
<<<<<<< Updated upstream
           isEditing={editStatus}
           handlePhoneState={handlePhoneInputState}
           handleInputChange={handlePhoneInputChange}
           phoneNumberState={phoneInputError}
           phoneGroup={formState.phoneGroup}
          ></ContactFormPhoneTable>
          <ContactFormEmailTable isEditing={editStatus}></ContactFormEmailTable>
=======
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
>>>>>>> Stashed changes
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
