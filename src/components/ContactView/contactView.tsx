import { Paper, Stack } from "@mui/material";
import ContactMenuBar from "./contactMenuBar";
import ContactDetails from "./contactDetails";
import ContactEmailTable from "./ContactDetailTable/contactEmailTable";
import ContactPhoneTable from "./ContactDetailTable/contactPhoneTable";

const ContactView: React.FC = () => {
  return (
    <Paper sx={{ flexGrow: 1, overflowY: "auto"}}>
      <ContactMenuBar></ContactMenuBar>
      <ContactDetails></ContactDetails>
      <Stack direction={{sm:"column", md:"row"}} gap="5rem" p="1rem 3rem">
        <ContactPhoneTable></ContactPhoneTable>
        <ContactEmailTable></ContactEmailTable>
      </Stack>
    </Paper>
  );
};

export default ContactView;
