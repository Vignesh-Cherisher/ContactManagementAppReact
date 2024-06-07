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
import { ChangeEvent, useState } from "react";
import { ContactItem } from "../../models/contactItem.model.tsx";
import { FocusEvent } from "react";
import UIModal from "../../UI/Modal.tsx";

type ContactFormDetailsType = {
  dobErrorState: boolean;
  contact: ContactItem;
  isLoading: boolean;
  handleFavContact: () => void;
  dobInputState: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const ContactFormDetails: React.FC<ContactFormDetailsType> = ({
  handleFavContact,
  dobErrorState,
  dobInputState,
  isLoading,
  handleInputChange,
  contact,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModalControl = () => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      {!isLoading && (
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
                      src={contact.url === '' ? '/public/OIP.jpg' : `${contact.url}`}
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
                      ...(contact.isFav ? { color: "red" } : { color: "gray" }),
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
