import { Box } from "@mui/material";
import ContactMenuBar from "./contactMenuBar";
import ContactDetails from "./contactDetails";
import ContactEmailTable from "./ContactDetailTable/contactEmailTable";
import ContactPhoneTable from "./ContactDetailTable/contactPhoneTable";

const ContactView: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto"}}>
      <ContactMenuBar></ContactMenuBar>
      <ContactDetails></ContactDetails>
      <Box display="flex" gap="5rem" p="1rem 3rem">
        <ContactPhoneTable></ContactPhoneTable>
        <ContactEmailTable></ContactEmailTable>
      </Box>
    </Box>
  );
};

export default ContactView;
