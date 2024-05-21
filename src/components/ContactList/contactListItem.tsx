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
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

const ContactListItem: React.FC = () => {
  const contactItemList = useSelector((state: RootState) =>
    state.contactItem.transformedContacts
  );

  // const isSortedDesc = useSelector(
  //   (state: RootState) => state.contactItem.isSortedDesc
  // );

  // console.log(contactItemList);

  return (
    <List sx={{ overflowY: "scroll" }}>
      {contactItemList !== undefined &&
        contactItemList.map((item: ContactItem) => (
          <Box key={item.id} component="li" className="contact-list-item">
            <ListItem component="div">
              <ListItemText primary={item.fName} secondary={item.phone} />
              <ListItemAvatar>
                <Avatar alt={item.fName} src={item.url} />
              </ListItemAvatar>
            </ListItem>
            <Divider variant="middle" flexItem />
          </Box>
        ))}
    </List>
  );
};

export default ContactListItem;
