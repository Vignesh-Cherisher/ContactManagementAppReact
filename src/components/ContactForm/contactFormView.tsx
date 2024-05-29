import { Box, Button, Stack } from "@mui/material";
import ContactFormMenuBar from "./contactFormMenuBar";
import ContactFormDetails from "./contactFormDetails";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContactFormEmailTable from "./ContactFormDetailTable/contactFormEmailTable";
import ContactFormPhoneTable from "./ContactFormDetailTable/contactFormPhoneTable";
import { useDispatch, useSelector } from "react-redux";
import { ContactItem } from "../../models/contactItem.model";
import { PhoneNumberGroup } from "../../models/phoneList.model";
import { EmailAddressGroup } from "../../models/emailAddress.model";
import { FocusEvent } from "react";
import { contactItemActions, selectContactById } from "../../store/contactItem.slice";
import { phoneNumberListActions } from "../../store/phoneNumberList.slice";
import { emailAddressListActions } from "../../store/emailAddressList.slice";
import { usePostContactItemMutation } from "../../services/contactItem.service";
import { AppDispatch, RootState } from "../../store/index";
import { invalidateTagsAcrossApis } from "../../services/sharedTagInvalidation.middleware";
import { convertDate, getDobValue, phoneNumberCheck, dateComparer } from "../../utils/contactAndDateFormatters";



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
  const randomInt = isEditing
    ? parseInt(id)
    : Math.floor(Math.random() * (10000 + 1));
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
  
  const handleFavoriteContact = useCallback(() => {
    setFormState((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        isFav: !prevState.contact.isFav,
      }
    }))
  }, []);

  const isLoading = useSelector(
    (state: RootState) => state.contactItem.isLoading
  );
  const contactDataById = useSelector((state: RootState) =>
    selectContactById(state, parseInt(id!))
  );

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
  }, [isLoading, editStatus, contactDataById, handleFavoriteContact]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        [name]: value,
      },
    }));
  };

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
      dispatch(contactItemActions.contactItemUpsertOne(newContact));
      dispatch(phoneNumberListActions.phoneNumberListUpsertOne(newPhoneGroup));
      dispatch(
        emailAddressListActions.emailAddressListUpsertOne(newEmailGroup)
      );
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
          handleInputChange={handleInputChange}
          contact={formState.contact}
          handleImageUrl={(imgUrl) => onImageUrlChange(imgUrl)}
        ></ContactFormDetails>
        <Stack direction={{ sm: "column", md: "row" }} gap="5rem" p="1rem 3rem">
          <ContactFormPhoneTable
           isEditing={editStatus}
           handlePhoneState={handlePhoneInputState}
           handleInputChange={handlePhoneInputChange}
           phoneNumberState={phoneInputError}
           phoneGroup={formState.phoneGroup}
          ></ContactFormPhoneTable>
          <ContactFormEmailTable isEditing={editStatus}></ContactFormEmailTable>
        </Stack>
        <Box display="flex" gap="5rem" p="1rem 3rem"></Box>
        <div className="form-submit-button-container">
          <Button variant="contained" type="submit">
            {editStatus ? "Save" : "Add"}
          </Button>
          <Button variant="custom" type="reset" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default ContactFormView;
