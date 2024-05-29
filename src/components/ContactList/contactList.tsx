import React from "react";
import { ContactItem } from "../../models/contactItem.model";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { useNavigate } from "react-router-dom";

const ContactListItem: React.FC = () => {
  const navigate = useNavigate();
  const contactItemList = useSelector(
    (state: RootState) => state.contactItem.transformedContacts
  );

  return (
    <Paper >
      <List>
        {contactItemList !== undefined &&
          contactItemList.map((item: ContactItem) => (
            <Box
              key={item.id}
              component="li"
              className="contact-list-item"
              onClick={() => {
                navigate(item.id.toString());
              }}
            >
              <ListItem component="div">
                <ListItemText primary={item.fName} secondary={item.id} />
                <ListItemAvatar>
                  <Avatar alt={item.fName} src={item.url} />
                </ListItemAvatar>
              </ListItem>
              <Divider variant="middle" flexItem />
            </Box>
          ))}
      </List>
    </Paper>
  );
};

export default ContactListItem;
