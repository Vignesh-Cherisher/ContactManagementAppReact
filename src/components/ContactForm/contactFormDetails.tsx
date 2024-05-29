import {
  Box,
  Button,
  Grid,
  Icon,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import ImageWithAlt from "../../theme/ImgElement.tsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectContactById } from "../../store/contactItem.slice.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { ContactItem } from "../../models/contactItem.model.tsx";
import { FocusEvent } from "react";
import UIModal from "../../UI/Modal.tsx";
import { getDobValue } from "../../utils/contactAndDateFormatters.tsx";

type ContactFormDetailsType = {
  handleFavContact: () => void;
  favContactState: boolean;
  dobErrorState: boolean;
  dobInputState: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isEditing: boolean;
  handleImageUrl: (imgUrl: string) => void;
  handleInputChange: (event: ChangeEvent< HTMLInputElement | HTMLTextAreaElement>) => void
  contact: ContactItem
};

const ContactFormDetails: React.FC<ContactFormDetailsType> = ({
  handleFavContact,
  favContactState,
  dobErrorState,
  dobInputState,
  isEditing,
  handleImageUrl,
  handleInputChange,
  contact
}) => {
  const [imageUrlValue, setImageUrlValue] = useState("");

  // const [formState, setFormState] = useState<ContactItem>({
  //   id: 0,
  //   fName: "",
  //   lName: "",
  //   email: "",
  //   phone: "",
  //   dob: "",
  //   isFav: false,
  //   address: "",
  //   url: "",
  // });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModalControl = () => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  };

  const { id } = useParams();
  const isLoading = useSelector(
    (state: RootState) => state.contactItem.isLoading
  );
  const contactDataById = useSelector((state: RootState) =>
    selectContactById(state, parseInt(id!))
  );

  const setFormInputState = (
    value: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if(value === 'url') {
      handleImageUrl(event.target.value);  
    }
    setFormState((prevState) => {
      return {
        ...prevState,
        [value]: event.target.value.toString(),
      };
    });
  };

  const handleImageUrlInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setImageUrlValue(event.target.value.toString());
    handleImageUrl(event.target.value);
  };

  useEffect(() => {
    if (!isLoading && isEditing) {
      if (contactDataById.isFav) {
        handleFavContact();
      }
      setFormState({
        ...contactDataById,
        dob: getDobValue(contactDataById.dob),
      });
    }
  }, [isLoading, isEditing, handleFavContact, contactDataById]);

  useEffect(() => {
    if(!isLoading && isEditing) {
      handleImageUrl(formState.url)
    }
  })

  return (
    <>
      {!isLoading && isEditing && (
        <>
          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid
              container
              spacing={2}
              sx={{ p: "1rem 2rem 0 2rem" }}
              alignItems="center"
              justifyContent="space-around"
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={3}
                sx={{ m: "0 0 1rem 0" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    mb: "0.5rem",
                  }}
                >
                  <InputLabel
                    htmlFor="fName-input"
                    sx={{
                      m: "0 0 0.5rem 0",
                      width: "40%",
                      fontSize: "1rem",
                      fontWeight: "700",
                      textOverflow: "clip",
                      minWidth: "fit-content",
                    }}
                    className="contact-detail"
                  >
                    First Name:
                  </InputLabel>
                  <TextField
                    required
                    name="fName"
                    id="fName-input"
                    value={contact.fName}
                    onChange={handleInputChange}
                  ></TextField>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    mb: "0.5rem",
                  }}
                >
                  <InputLabel
                    htmlFor="lName-input"
                    sx={{
                      m: "0 0 0.5rem 0",
                      width: "40%",
                      fontSize: "1rem",
                      fontWeight: "700",
                      textOverflow: "clip",
                      minWidth: "fit-content",
                    }}
                    className="contact-detail"
                  >
                    Last Name:
                  </InputLabel>
                  <TextField
                    name="lName"
                    id="lName-input"
                    value={contact.lName}
                    onChange={handleInputChange}
                  ></TextField>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    gap: "1rem",
                    mb: "0.5rem",
                  }}
                >
                  <InputLabel
                    htmlFor="address-input"
                    sx={{
                      m: "0 0 0.5rem 0",
                      width: "40%",
                      fontSize: "1rem",
                      fontWeight: "700",
                      textOverflow: "clip",
                      minWidth: "fit-content",
                    }}
                    className="contact-detail"
                  >
                    Address:
                  </InputLabel>
                  <TextField
                    value={contact.address}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    id="address-input"
                    name="address"
                  ></TextField>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    mb: "0.5rem",
                  }}
                >
                  <InputLabel
                    htmlFor="dob-input"
                    sx={{
                      m: "0 0 0.5rem 0",
                      width: "40%",
                      fontSize: "1rem",
                      fontWeight: "700",
                      textOverflow: "clip",
                    }}
                    className="contact-detail"
                  >
                    DOB:
                  </InputLabel>
                  <TextField
                    error={dobErrorState}
                    helperText={dobErrorState ? "Enter a valid date" : ""}
                    type="date"
                    id="dob-input"
                    name="dob"
                    value={contact.dob}
                    onBlur={(event) => dobInputState(event)}
                    onChange={handleInputChange}
                  ></TextField>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sm={5}
                md={4}
                lg={4}
                xl={3}
                sx={{ mb: "1rem" }}
                textAlign="right"
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    sx={{ height: "fit-content", borderWidth: "0" }}
                    type="button"
                    onClick={handleModalControl}
                  >
                    <ImageWithAlt
                      width="75%"
                      alt={contact.fName}
                      src={contact.url}
                    />
                  </Button>
                  <UIModal open={isOpen} handleClose={handleModalControl}>
                    <>
                      <Typography variant="body1">
                        Please enter the Profile picture Url:
                      </Typography>
                      <TextField
                        value={contact.url}
                        onChange={handleInputChange}
                        label="Image Url"
                        name="url"
                        id="url-input"
                        sx={{ marginBlock: "0.7rem" }}
                      ></TextField>
                    </>
                  </UIModal>
                </Box>
                <button
                  onClick={() => handleFavContact()}
                  className="favorite-contact-button"
                  type="button"
                >
                  <Icon
                    sx={{
                      ...(favContactState
                        ? { color: "red" }
                        : { color: "gray" }),
                    }}
                  >
                    favorite
                  </Icon>
                </button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {!isLoading && !isEditing && (
        <>
          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid
              container
              spacing={2}
              sx={{ p: "1rem 2rem 0 2rem" }}
              alignItems="flex-start"
              justifyContent="space-around"
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={3}
                sx={{ m: "0 0 1rem 0" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    mb: "0.5rem",
                  }}
                >
                  <InputLabel
                    htmlFor="fName-input"
                    sx={{
                      m: "0 0 0.5rem 0",
                      width: "40%",
                      fontSize: "1rem",
                      fontWeight: "700",
                      textOverflow: "clip",
                      minWidth: "fit-content",
                    }}
                    className="contact-detail"
                  >
                    First Name:
                  </InputLabel>
                  <TextField
                    required
                    label="First Name"
                    name="fName"
                    id="fName-input"
                    value={contact.fName ?? ''}
                    onChange={handleInputChange}
                  ></TextField>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    mb: "0.5rem",
                  }}
                >
                  <InputLabel
                    htmlFor="lName-input"
                    sx={{
                      m: "0 0 0.5rem 0",
                      width: "40%",
                      fontSize: "1rem",
                      fontWeight: "700",
                      textOverflow: "clip",
                      minWidth: "fit-content",
                    }}
                    className="contact-detail"
                  >
                    Last Name:
                  </InputLabel>
                  <TextField
                    label="Last Name"
                    name="lName"
                    id="lName-input"
                    value={contact.lName ?? ''}
                    onChange={handleInputChange}
                  ></TextField>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    gap: "1rem",
                    mb: "0.5rem",
                  }}
                >
                  <InputLabel
                    htmlFor="address-input"
                    sx={{
                      m: "1rem 0 0.5rem 0",
                      width: "40%",
                      fontSize: "1rem",
                      fontWeight: "700",
                      textOverflow: "clip",
                      minWidth: "fit-content",
                    }}
                    className="contact-detail"
                  >
                    Address:
                  </InputLabel>
                  <TextField
                    label="Address"
                    multiline
                    rows={3}
                    id="address-input"
                    name="address"
                    value={contact.address ?? ''}
                    onChange={handleInputChange}
                  ></TextField>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    mb: "0.5rem",
                  }}
                >
                  <InputLabel
                    htmlFor="dob-input"
                    sx={{
                      m: "0 0 0.5rem 0",
                      width: "40%",
                      fontSize: "1rem",
                      fontWeight: "700",
                      textOverflow: "clip",
                    }}
                    className="contact-detail"
                  >
                    DOB:
                  </InputLabel>
                  <TextField
                    error={dobErrorState}
                    helperText={dobErrorState ? "Enter a valid date" : ""}
                    value={contact.dob ?? ''}
                    onBlur={(event) => dobInputState(event)}
                    onChange={handleInputChange}
                    type="date"
                    id="dob-input"
                    name="dob"
                  ></TextField>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sm={5}
                md={4}
                lg={4}
                xl={3}
                sx={{ mb: "1rem" }}
                textAlign="right"
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    sx={{ height: "fit-content" }}
                    type="button"
                    onClick={handleModalControl}
                  >
                    <ImageWithAlt
                      width="75%"
                      alt="Profile Picture"
                      src="/public/OIP.jpg"
                    />
                  </Button>
                  <UIModal open={isOpen} handleClose={handleModalControl}>
                    <>
                      <Typography variant="body1">
                        Please enter the Profile picture Url:
                      </Typography>
                      <TextField
                        value={contact.url}
                        onChange={handleInputChange}
                        label="Image Url"
                        name="url"
                        id="url-input"
                        sx={{ marginBlock: "0.7rem" }}
                      ></TextField>
                    </>
                  </UIModal>
                </Box>
                <button
                  onClick={() => handleFavContact()}
                  className="favorite-contact-button"
                  type="button"
                >
                  <Icon
                    sx={{
                      ...(favContactState
                        ? { color: "red" }
                        : { color: "gray" }),
                    }}
                  >
                    favorite
                  </Icon>
                </button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default ContactFormDetails;
