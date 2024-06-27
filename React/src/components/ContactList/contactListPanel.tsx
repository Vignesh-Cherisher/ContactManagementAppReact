import ContactPanelContent from "./contactPanelContent";
import { Drawer, Paper, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { responsiveUiActions, selectDrawerOpenState } from "../../store/responsiveUi.slice";
import { RootState } from "../../store";

const ContactListPanel: React.FC = () => {
  const dispatch = useDispatch()

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const drawerOpen = useSelector((state: RootState) => selectDrawerOpenState(state))

  const toggleDrawer = (isOpen: boolean) => {
    dispatch(responsiveUiActions.toggleDrawer(isOpen));
  };

  return (
    <>
      {isLargeScreen ? (
          <Paper sx={{display:"flex", width:"30%",maxWidth:"430px", flexDirection:"column", p:"0.5rem", gap:"0.5rem", minWidth:"300px", overflowY:"auto", ...(theme.palette.mode === 'dark' ? {bgcolor:theme.palette.contactPanelBorderP.dark} : { bgcolor:theme.palette.contactPanelBorderP.main})}}>
            <ContactPanelContent />
          </Paper>
      ) : (
        <>
          <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
            <Paper sx={{display:"flex", width:"max-content", flexDirection:"column", p:"0.5rem", gap:"0.5rem", minWidth:"300px", overflowY:"auto", ...(theme.palette.mode === 'dark' ? {bgcolor:theme.palette.contactPanelBorderP.dark} : { bgcolor:theme.palette.contactPanelBorderP.main})}} className="fill-width">
              <ContactPanelContent />
            </Paper>
          </Drawer>
        </>
      )}
    </>
  );
};

export default ContactListPanel;
