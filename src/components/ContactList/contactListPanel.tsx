import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import ContactListItem from "./contactListItem";
import { useDispatch } from "react-redux";
import { contactItemActions } from "../../store/contactItem.slice";
import { useState } from "react";

const ContactListPanel: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch();

  const sortContactListHandler = () => {
    dispatch(contactItemActions.sortContactList())
  };

  const searchContactHandler = (searchTextValue: string) => {
    setSearchText(searchTextValue)
    dispatch(contactItemActions.searchContactHandler(searchTextValue))
  }

  const filterContactListHandler = () => {
    dispatch(contactItemActions.filterContactList())
  }

  return (
    <>
      <div className="contact-list-container">
        <div className="contact-list-controller-wrapper">
          <div className="contact-list-search-controller">
            <FormControl sx={{ m: 1, width: "13rem" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Search
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type="text"
                value={searchText}
                onChange={(event) => searchContactHandler(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Icon aria-label="toggle password visibility">search</Icon>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <Box className="contact-list-controller-container">
            <Button variant="contained" startIcon={<Icon>filter_alt</Icon>} onClick={filterContactListHandler}>
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<Icon>swap_vert</Icon>}
              onClick={sortContactListHandler}
            >
              Sort
            </Button>
            <Button variant="contained" startIcon={<Icon>add</Icon>}>
              Add
            </Button>
          </Box>
        </div>
        <ContactListItem/>
      </div>
    </>
  );
};

export default ContactListPanel;
