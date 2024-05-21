import { Outlet } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import ContactListPanel from "./ContactList/contactListPanel";
import { Box } from "@mui/material";

const RootLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Box className="root-layout">
        <ContactListPanel />
        <Outlet />
      </Box>
    </>
  );
};

export default RootLayout;
