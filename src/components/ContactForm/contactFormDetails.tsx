import {
  Box,
  Grid,
  Icon,
  InputLabel,
  TextField,
} from "@mui/material";
import { Img } from "../../util/ImgElement";

const ContactFormDetails: React.FC<{handleFavContact: () => void, favContactState: boolean}> = ({handleFavContact, favContactState}) => {
  return (
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
            <Box sx={{ display:"flex", alignItems: "center", gap:"1rem", mb: "0.5rem"}}>
              <InputLabel
                htmlFor="fName-input"
                sx={{ m: "0 0 0.5rem 0",width: "20%", fontSize:"1rem", fontWeight: "700" }}
                className="contact-detail"
              >
                First Name:
              </InputLabel>
              <TextField label="First Name" name="fName" id="fName-input"></TextField>
            </Box>
            <Box sx={{ display:"flex", alignItems: "center", gap:"1rem",mb: "0.5rem"}}>
              <InputLabel
                htmlFor="lName-input"
                sx={{ m: "0 0 0.5rem 0",width: "20%", fontSize:"1rem", fontWeight: "700" }}
                className="contact-detail"
              >
                Last Name:
              </InputLabel>
              <TextField label="Last Name" name="lName" id="lName-input"></TextField>
            </Box>
            <Box sx={{ display:"flex", alignItems: "start", gap:"1rem", mb: "0.5rem"}}>
              <InputLabel
                htmlFor="address-input"
                sx={{ m: "1rem 0 0.5rem 0", width: "20%", fontSize:"1rem", fontWeight: "700" }}
                className="contact-detail"
              >
                Address:
              </InputLabel>
              <TextField label="Address" multiline rows={3} id="address-input" name="address"></TextField>
            </Box>
            <Box sx={{ display:"flex", alignItems: "center", gap:"1rem", mb: "0.5rem"}}>
              <InputLabel
                htmlFor="dob-input"
                sx={{ m: "0 0 0.5rem 0", width: "20%", fontSize:"1rem", fontWeight: "700" }}
                className="contact-detail"
              >
                DOB: 
              </InputLabel>
              <TextField type="date" id="dob-input" name="dob"></TextField>
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
            <Img alt="Profile Picture" src="/public/OIP.jpg" className="profile-picture-upload"/>
            <button onClick={() => handleFavContact()} className="favorite-contact-button">
              <Icon sx={{...(favContactState ? {color: "red"} : {color: "gray"})}}>favorite</Icon>
            </button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContactFormDetails;
