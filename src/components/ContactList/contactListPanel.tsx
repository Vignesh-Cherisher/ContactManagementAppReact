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
import { useGetContactItemQuery } from "../../services/contactItem.service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { contactItemActions } from "../../store/contactItem.slice";

const ContactListPanel: React.FC = () => {
  const { data } = useGetContactItemQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(contactItemActions.contactItemSetAll(data));
    }
  }, [data, dispatch]);

  const sortListHandler = () => {
    dispatch(contactItemActions.sortListHandler())
  };

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
                endAdornment={
                  <InputAdornment position="end">
                    <Icon aria-label="toggle password visibility">search</Icon>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <Box className="contact-list-controller-container">
            <Button variant="contained" startIcon={<Icon>filter_alt</Icon>}>
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<Icon>swap_vert</Icon>}
              onClick={sortListHandler}
            >
              Sort
            </Button>
            <Button variant="contained" startIcon={<Icon>add</Icon>}>
              Add
            </Button>
          </Box>
        </div>
        <ContactListItem />
      </div>
    </>
  );
};

export default ContactListPanel;
