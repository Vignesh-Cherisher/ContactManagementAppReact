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
const ContactViewPlaceholder: React.FC = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useDispatch();

  const toggleDrawer = (isOpen: boolean) => {
    dispatch(responsiveUiActions.toggleDrawer(isOpen));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isLargeScreen ? (
        ""
      ) : (
        <Box
          sx={{
            display: "flex",
            p: "1rem 2rem",
            justifyContent: "space-between",
            borderBottom: "1px  solid",
            borderColor: "palette.text.primary",
            minHeight: 57,
          }}
          boxShadow={shadows[1]}
        >
          <Button
            onClick={() => toggleDrawer(true)}
            sx={{
              width: "fit-content",
              m: "0 0.5rem 0 0 ",
              p: "0",
              minWidth: "0",
            }}
          >
            <Icon sx={{ color: "palette.text.primary" }}>menu</Icon>
          </Button>
        </Box>
      )}

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mt: "4rem",
          textAlign: "center",
          fontFamily: "poppins",
          fontWeight: "700",
          color: "red",
        }}
      >
        No Contact Selected!
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ textAlign: "center" }}>
        Select a contact from the List to View in detail.
      </Typography>
    </Box>
  );
};

export default ContactViewPlaceholder;
