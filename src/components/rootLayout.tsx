import { Outlet } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import ContactListPanel from "./ContactList/contactListPanel";
import { Stack } from "@mui/material";

const RootLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Stack direction={{md:"column", lg:"row"}} className="root-layout">
        <ContactListPanel />
        <Outlet />
      </Stack>
    </>
  );
};

export default RootLayout;
