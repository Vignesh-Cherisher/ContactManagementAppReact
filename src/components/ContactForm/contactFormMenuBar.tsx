import { AppBar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { StyledToolbar } from "../../util/styledToolbar";


const ContactFormMenuBar: React.FC<{isEditing: boolean}> = ({isEditing}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"))
  
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{  ...(isLargeScreen ? null : isMobileScreen ? {ml: "32px"} : { ml: "24px"}), flexGrow: 1, mt: "0.3rem", fontFamily: "poppins" }}
        >
          {isEditing ? 'Edit Contact' : 'New Contact'}
        </Typography>
      </StyledToolbar>
    </AppBar>
  );
};

export default ContactFormMenuBar;