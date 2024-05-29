import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MaterialUISwitch from "../../theme/muiSwitch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { responsiveUiActions, selectDarkMode } from "../../store/responsiveUi.slice";

const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const isDarkMode = useSelector((state: RootState) => selectDarkMode(state))
  const dispatch = useDispatch()

  const toggleDarkMode = () => {
    dispatch(responsiveUiActions.toggleisDarkMode())
  }

  return (
    <>
      <Paper sx={{display:"flex", justifyContent:"space-between", p:"0.5rem 1rem", boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;", alignItems: "center"}}>
        <Avatar className="logo" src="/Logo.jpeg" sx={{cursor: "pointer"}} onClick = {() => {navigate("/")}} />
        <Box className="brand-container">
          <Typography variant="h5" sx={{fontWeight:"700", fontFamily:"poppins", color:"rgb(241,157,0)"}}>Tring</Typography>
          <Typography variant="body2" sx={{fontSize:"0.7rem"}}>Stay Connected! Stay Organized!</Typography>
        </Box>
        <Box className="profile">
        <MaterialUISwitch sx={{ m: 1 }} checked={isDarkMode} onChange={toggleDarkMode}/>
          <Avatar src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" alt="User Profile Image" />
          <Box className="profile-detail">
            <Typography variant="body1">John Doe</Typography>
            <Typography variant="body1">jd.user@tmail.co</Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default NavBar;
