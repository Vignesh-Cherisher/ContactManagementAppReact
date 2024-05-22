import { AppBar, Typography } from "@mui/material";
import { StyledToolbar } from "../../util/styledToolbar";


const ContactFormMenuBar: React.FC = () => {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ flexGrow: 1, mt: "0.3rem", fontFamily: "poppins" }}
        >
          New Contact
        </Typography>
      </StyledToolbar>
    </AppBar>
  );
};

export default ContactFormMenuBar;