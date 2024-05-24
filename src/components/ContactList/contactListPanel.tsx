import { useState } from "react";
import ContactPanelContent from "./contactPanelContent";
import { Box, Button, Drawer, Icon, useMediaQuery, useTheme } from "@mui/material";

const ContactListPanel: React.FC = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {isLargeScreen ? (
          <div className="contact-list-container">
            <ContactPanelContent />
          </div>
      ) : (
        <>
          <Box sx={{position: "relative"}}>
          <Button sx={{position: "absolute", left:"0", mt:"0.6rem", fontSize:"1.5rem", zIndex:"10"}} onClick={toggleDrawer(true)}>
            <Icon sx={{color:"white"}}>menu</Icon>
          </Button>
          </Box>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <div className="contact-list-container">
              <ContactPanelContent />
            </div>
          </Drawer>
        </>
      )}
    </>
  );
};

export default ContactListPanel;
