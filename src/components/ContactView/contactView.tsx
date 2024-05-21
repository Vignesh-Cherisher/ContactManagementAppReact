import { Box } from "@mui/material";
import ContactMenuBar from "./contactMenuBar";
import ContactDetails from "./contactDetails";
import ContactDetailTable from "./contactDetailTable";



const ContactView: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ContactMenuBar></ContactMenuBar>
      <ContactDetails></ContactDetails>
      <Box display="flex" gap="5rem" p="1rem 3rem">

        <ContactDetailTable></ContactDetailTable>
        <ContactDetailTable></ContactDetailTable>
      </Box>
    </Box>
  );
};

export default ContactView;
