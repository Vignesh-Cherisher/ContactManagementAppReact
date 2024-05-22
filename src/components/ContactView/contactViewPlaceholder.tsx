import { Box, Typography } from "@mui/material";

const ContactViewPlaceholder: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: "4rem", textAlign: "center", fontFamily: "poppins", fontWeight: "700", color: "red" }}>
        No Contact Selected!
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ textAlign: "center" }}>
        Select a contact from the List to View in detail.
      </Typography>
    </Box>
  );
};

export default ContactViewPlaceholder;
