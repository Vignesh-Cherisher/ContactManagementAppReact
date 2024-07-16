import { Outlet } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import ContactListPanel from "./ContactList/contactListPanel";
import { Stack } from "@mui/material";

const RootLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Stack direction={{md:"column", lg:"row"}} sx={{display: "flex", overflow: "hidden", height:"100%"}}>
        <ContactListPanel />
        <Outlet />
      </Stack>
    </>
  );
};

export default RootLayout;
