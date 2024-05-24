import {
  AppBar,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { contactItemActions } from "../../store/contactItem.slice";
import { useDeleteContactItemMutation } from "../../services/contactItem.service";
import DeleteModal from "../../UI/DeleteModal";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  "@media all": {
    minHeight: 40,
  },
}));

const ContactMenuBar: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"))
  
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  const [deleteContactItem] = useDeleteContactItemMutation()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    handleCloseUserMenu()
    setOpenModal(false);
  };


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleEditContact = () => {
    navigate(`/${id}/edit`)
  }

  const handleDeleteContact = () => {
    deleteContactItem(id!)
    dispatch(contactItemActions.contactItemRemove(parseInt(id!)))
    handleCloseUserMenu()
    navigate("/")
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ ...(isLargeScreen ? null : isMobileScreen ? {ml: "32px"} : { ml: "24px"}),flexGrow: 1, mt: "0.3rem", fontFamily: "poppins"}}
        >
          Contact Details
        </Typography>
        <IconButton
          size="large"
          aria-label="display more actions"
          edge="end"
          color="inherit"
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key="editContact" onClick={handleEditContact}>
            <Typography textAlign="center">Edit</Typography>
          </MenuItem>
          <MenuItem key="deleteContact" onClick={handleOpen}>
            <Typography textAlign="center">Delete</Typography>
          </MenuItem>
        </Menu>
      </StyledToolbar>
      <DeleteModal open={openModal} handleClose={handleClose} triggerDelete={handleDeleteContact}></DeleteModal>
    </AppBar>
  );
};

export default ContactMenuBar;
