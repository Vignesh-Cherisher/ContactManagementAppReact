import {
  Box,
  Button,
  Grid,
  Icon,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
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
  profileImage: File | null;
  handleFavContact: () => void;
  validateDob: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputGroup: string
  ) => void;
};

const ContactFormDetails: React.FC<ContactFormDetailsType> = ({
  handleFavContact,
  dobErrorState,
  validateDob,
  isLoading,
  handleInputChange,
  contact,
  profileImage
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

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
              sx={{
                p: "1rem 2rem 0 2rem",
                ...(isSmallScreen ? "" : { flexDirection: "column-reverse" }),
              }}
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
                    onChange={(event) => handleInputChange(event, "contact")}
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
                    onChange={(event) => handleInputChange(event, "contact")}
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
                    onChange={(event) => handleInputChange(event, "contact")}
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
                    onBlur={(event) => validateDob(event)}
                    onChange={(event) => handleInputChange(event, "contact")}
                  ></TextField>
                </Box>
              </Grid>
              <Grid
                item
                xs={8}
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
                      src={
                        contact.url === ""
                          ? "/public/OIP.jpg"
                          : `${contact.url}`
                      }
                    />
                  </Button>
                  <UIModal open={isOpen} handleClose={handleModalControl}>
                    <>
                      <Typography variant="body1">
                        Upload your Profile picture:
                      </Typography>
                      <TextField
                        onChange={(event) =>
                          handleInputChange(event, "profileImage")
                        }
                        label="Image Url"
                        name="img"
                        id="img-input"
                        type="file"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ marginBlock: "0.7rem" }}
                      >
                        <label
                          htmlFor="img-input"
                          style={{ display: "block", marginBottom: "5px" }}
                        >
                          {profileImage?.name}
                        </label>
                      </TextField>
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
