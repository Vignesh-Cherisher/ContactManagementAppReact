import React, { useEffect } from "react";
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
import { selectAllContacts } from "../../store/contactItem.slice";

const ContactListItem: React.FC = () => {
  const contactItemList = useSelector((state: RootState) =>
    selectAllContacts(state)
  );

  const isSortedDesc = useSelector(
    (state: RootState) => state.contactItem.isSortedDesc
  );

  useEffect(() => {
    if (isSortedDesc) {
      contactItemList.sort((a: ContactItem, b: ContactItem) => {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      });
      return
    }
    contactItemList.sort((a: ContactItem, b: ContactItem) => {
      return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
    });
  }, [isSortedDesc, contactItemList]);
  console.log(contactItemList);

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
