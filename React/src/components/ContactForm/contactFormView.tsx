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
import {
  usePostContactItemMutation,
  usePostContactImageMutation,
} from "../../services/contactItem.service";
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
  profileImg: File | null;
};

const preprocessData = <
  inputType extends ContactItem | PhoneNumberGroup | EmailAddressGroup
>(
  data: inputType
): inputType => {
  const processedData: inputType = { ...data };
  Object.keys(processedData).forEach((key) => {
    const typedKey = key as keyof inputType;
    const value = processedData[typedKey];
    if (typeof value === "string" && value === "") {
      processedData[typedKey] = null as never;
    }
  });
  return processedData as inputType;
};

const createContactGroup = async (
  formState: formStateType,
  isEditing: boolean,
  id: string
): Promise<formStateType> => {
  const randomInt = isEditing
    ? parseInt(id)
    : Math.floor(Math.random() * (10000 + 1));
  let contact: ContactItem = formState.contact;
  contact.id = randomInt;
  contact.dob =
    formState.contact.dob === ""
      ? formState.contact.dob
      : convertDate(formState.contact.dob);
  contact.phone = `phone${randomInt}`;
  contact.email = `email${randomInt}`;
  let phoneGroup: PhoneNumberGroup = formState.phoneGroup;
  phoneGroup.id = `phone${randomInt}`;
  let emailGroup: EmailAddressGroup = formState.emailGroup;
  emailGroup.id = `email${randomInt}`;
  contact = preprocessData(contact);
  phoneGroup = preprocessData(phoneGroup);
  emailGroup = preprocessData(emailGroup);
  let profileImg = formState.profileImg;
  if (profileImg === null) {
    const response = await fetch("/OIP.jpg"); // Adjust the path as needed
    const blob = await response.blob();
    profileImg = new File([blob], "default-image.jpg", {
      type: blob.type,
    });
  }
  return { contact, phoneGroup, emailGroup, profileImg };
};

const checkPhoneInputError = (phoneInputState: phoneNumberStateType) => {
  return Object.values(phoneInputState).some((item) => item);
};

const ContactFormView: React.FC = () => {
  const editStatus = useLocation().pathname.includes("edit");
  const { id } = useParams();
  const [postContactItem] = usePostContactItemMutation();
  const [postContactImage] = usePostContactImageMutation();
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
      address: " ",
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
    profileImg: null,
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

  const { data: emailDataById } = useGetEmailAddressListByIdQuery(id!, {
    skip: id === undefined,
  });

  const { data: phoneNumberById } = useGetPhoneNumberListByIdQuery(id!, {
    skip: id === undefined,
  });

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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputGroup: string
  ) => {
    if (inputGroup === "profileImage") {
      const eventTarget = (event.target as HTMLInputElement).files;
      if (eventTarget && eventTarget.length > 0) {
        setFormState((prevState) => ({
          ...prevState,
          profileImg: eventTarget[0],
        }));
      }
      return;
    }
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
      const { contact, phoneGroup, emailGroup, profileImg } =  {
        ... await createContactGroup(formState, editStatus, id!),
      };
      dispatch(contactItemActions.contactItemUpsertOne(contact));
      console.log(contact, phoneGroup, emailGroup);
      await postContactItem({ contact, phoneGroup, emailGroup });
      console.log(profileImg);
      await postContactImage({ id: contact.id, profileImage: profileImg });
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
          <Button
            variant="outlined"
            type="reset"
            onClick={() => navigate("..", { relative: "path" })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default ContactFormView;
