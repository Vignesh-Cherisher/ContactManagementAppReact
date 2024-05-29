import {
  AppBar,
  Box,
  Button,
  Icon,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { StyledToolbar } from "../../theme/styledToolbar";
import { useDispatch } from "react-redux";
import { responsiveUiActions } from "../../store/responsiveUi.slice";

const ContactFormMenuBar: React.FC<{ isEditing: boolean }> = ({
  isEditing,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  
  const toggleDrawer = (isOpen: boolean) => {
    dispatch(responsiveUiActions.toggleDrawer(isOpen));
  };

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Box sx={{ display: "flex" }}>
          {isLargeScreen ? (
            ""
          ) : (
            <Button
              onClick={() => toggleDrawer(true)}
              sx={{
                width: "fit-content",
                m: "0 0.5rem 0 0 ",
                p: "0",
                minWidth: "0",
              }}
            >
              <Icon sx={{ color: "white" }}>menu</Icon>
            </Button>
          )}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              fontFamily: "poppins",
            }}
          >
            {isEditing ? "Edit Contact" : "New Contact"}
          </Typography>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default ContactFormMenuBar;
