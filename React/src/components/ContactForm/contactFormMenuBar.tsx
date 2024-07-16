import {
  Box,
  Button,
  Icon,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { responsiveUiActions } from "../../store/responsiveUi.slice";
import shadows from "@mui/material/styles/shadows";

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
    <Box
      sx={{
        display: "flex",
        p: "1rem 2rem",
        justifyContent: "space-between",
        borderBottom: "1px  solid",
        borderColor: 'palette.text.primary'
      }}
      boxShadow={shadows[1]}
    >
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
              <Icon sx={{color: 'action.active'}}>menu</Icon>
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
    </Box>
  );
};

export default ContactFormMenuBar;
