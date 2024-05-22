import { Box, Button } from "@mui/material";
import ContactFormMenuBar from "./contactFormMenuBar";
import ContactFormDetails from "./contactFormDetails";
import { FormEvent, useState } from "react";
// import ContactDetails from "./contactDetails";
// import ContactEmailTable from "./ContactDetailTable/contactEmailTable";
// import ContactPhoneTable from "./ContactDetailTable/contactPhoneTable";

const ContactFormView: React.FC = () => {
  const [favContact,setFavContact] = useState(false)

  const handleFavoriteContact = () => {
    setFavContact(!favContact)
  }

  const submitFormHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)
    console.log(Object.fromEntries(fd.entries()))
  }

  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
      <ContactFormMenuBar></ContactFormMenuBar>
      <form className="form-control" onSubmit={submitFormHandler}>
        <ContactFormDetails handleFavContact={handleFavoriteContact} favContactState={favContact}></ContactFormDetails>
        <Box display="flex" gap="5rem" p="1rem 3rem"></Box>
        <div className="form-submit-button-container">
          <Button variant="contained" type="submit">Add</Button>
        </div>
      </form>
    </Box>
  );
};

export default ContactFormView;
