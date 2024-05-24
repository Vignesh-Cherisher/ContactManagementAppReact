import { Box, Grid, Icon, InputLabel, TextField } from "@mui/material";
import { Img } from "../../util/ImgElement";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectContactById } from "../../store/contactItem.slice.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { ContactItem } from "../../models/contactItem.model.tsx";
import { FocusEvent } from "react";

const getDobValue = (dobValue: string) => {
  const [dobDay, dobMonth, dobYear] = dobValue.split('-').map(Number);

  const dob = new Date(`${dobMonth}-${dobDay}-${dobYear}`);
  
  const year = dob.getFullYear();
  const month = (dob.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
  const day = dob.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
};

const ContactFormDetails: React.FC<{
  handleFavContact: () => void;
  favContactState: boolean;
  dobErrorState: boolean;
  dobInputState: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isEditing: boolean;
}> = ({ handleFavContact, favContactState, dobErrorState, dobInputState, isEditing }) => {
  const [formState, setFormState] = useState<ContactItem>({
    id: 0,
    fName: "",
    lName: "",
    email: "",
    phone: "",
    dob: "",
    isFav: false,
    address: "",
    url: "",
  });
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
    setFormState((prevState) => {
      return {
        ...prevState,
        [value]: event.target.value.toString(),
      };
    });
  };

  useEffect(() => {
    if (!isLoading && isEditing) {
      if(contactDataById.isFav){
        handleFavContact()
      }
      setFormState({ ...contactDataById, dob: getDobValue(contactDataById.dob) });
    }
  }, [isLoading, isEditing, handleFavContact, contactDataById]);

  return (
    <>
      {!isLoading && isEditing && (
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
                sm={12}
                md={6}
                lg={6}
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
                      width: "20%",
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}
                    className="contact-detail"
                  >
                    First Name:
                  </InputLabel>
                  <TextField
                    required
                    name="fName"
                    id="fName-input"
                    value={formState.fName}
                    onChange={(event) => setFormInputState("fName", event)}
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
                      width: "20%",
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}
                    className="contact-detail"
                  >
                    Last Name:
                  </InputLabel>
                  <TextField
                    name="lName"
                    id="lName-input"
                    value={formState.lName}
                    onChange={(event) => setFormInputState("lName", event)}
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
                      width: "20%",
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}
                    className="contact-detail"
                  >
                    Address:
                  </InputLabel>
                  <TextField
                    value={formState.address}
                    onChange={(event) => setFormInputState("address", event)}
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
                      width: "20%",
                      fontSize: "1rem",
                      fontWeight: "700",
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
                    value={formState.dob}
                    onBlur={(event)=> dobInputState(event)}
                    onChange={(event) => setFormInputState("dob", event)}
                  ></TextField>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                sx={{ mb: "1rem" }}
                textAlign="right"
              >
                <Box>
                  <TextField
                    value={formState.url}
                    onChange={(event) => setFormInputState("url", event)}
                    id="address-input"
                    name="url"
                    sx={{ m: "0 0 1rem 0" }}
                  ></TextField>
                  <Img
                    alt="Profile Picture"
                    src={formState.url}
                    className="profile-picture-upload"
                  />
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
                sm={12}
                md={6}
                lg={6}
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
                      width: "20%",
                      fontSize: "1rem",
                      fontWeight: "700",
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
                      width: "20%",
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}
                    className="contact-detail"
                  >
                    Last Name:
                  </InputLabel>
                  <TextField
                    label="Last Name"
                    name="lName"
                    id="lName-input"
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
                      width: "20%",
                      fontSize: "1rem",
                      fontWeight: "700",
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
                      width: "20%",
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}
                    className="contact-detail"
                  >
                    DOB:
                  </InputLabel>
                  <TextField
                    error={dobErrorState}
                    helperText={dobErrorState ? "Enter a valid date" : ""}
                    onBlur={(event)=> dobInputState(event)}
                    type="date"
                    id="dob-input"
                    name="dob"
                  ></TextField>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                sx={{ mb: "1rem" }}
                textAlign="right"
              >
                <Box>
                  <TextField
                    label="Image Url"
                    id="address-input"
                    name="url"
                    sx={{ m: "0 0 1rem 0" }}
                  ></TextField>
                  <Img
                    alt="Profile Picture"
                    src="/public/OIP.jpg"
                    className="profile-picture-upload"
                  />
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
