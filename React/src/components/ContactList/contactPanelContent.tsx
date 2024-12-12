import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import ContactListItem from "./contactList";
import { useDispatch, useSelector } from "react-redux";
import { contactItemActions } from "../../store/contactItem.slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UIModal from "../../UI/Modal";
import { RootState } from "../../store";

type selectedFilterType = {
  isFavorite: boolean;
};

const ContactPanelContent: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const filterSliceState = useSelector(
    (state: RootState) => state.contactItem.isFavoritesFiltered
  );
  const isSorted = useSelector((state:RootState) => state.contactItem.isSortedDesc)
  const isFiltered = useSelector((state:RootState) => state.contactItem.isFavoritesFiltered)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<selectedFilterType>({
    isFavorite: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchContactHandler = (searchTextValue: string) => {
    setSearchText(searchTextValue);
    dispatch(contactItemActions.searchContactHandler(searchTextValue));
  };

  const handleContactListOperations = (operation: string) => {
    if (operation === "filter") {
      if (selectedFilters.isFavorite !== filterSliceState) {
        dispatch(contactItemActions.contactListOperationsHandler(operation));
      }
      handleModalControl();
    } else {
      dispatch(contactItemActions.contactListOperationsHandler(operation));
    }
  };

  const handleModalControl = () => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  };

  const handleCheckboxInput = (filterName: string) => {
    const formattedFilter = filterName as keyof selectedFilterType;
    setSelectedFilters((prevState) => {
      return { ...prevState, [formattedFilter]: !prevState[formattedFilter] };
    });
  };

  return (
    <>
      <Paper className="contact-list-controller-wrapper">
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
          <Button
            variant="outlined"
            startIcon={<Icon>filter_alt</Icon>}
            onClick={handleModalControl}
            sx={{...(isFiltered ? {bgcolor:'greenyellow'} : '')}}
          >
            Filter
          </Button>
          <UIModal
            open={isOpen}
            handleClose={handleModalControl}
            triggerAction={() => handleContactListOperations("filter")}
          >
            <>
              <Typography variant="body1">
                Choose from the list of filters available:
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  checked={selectedFilters.isFavorite}
                  label="Favorite"
                  onChange={() => handleCheckboxInput("isFavorite")}
                  sx={{ width: "fit-content" }}
                ></FormControlLabel>
              </FormGroup>
            </>
          </UIModal>
          <Button
            variant="outlined"
            startIcon={<Icon>swap_vert</Icon>}
            onClick={() => handleContactListOperations("sort")}
            sx={{...(isSorted ? {bgcolor:'goldenyellow'} : '')}}
          >
            Sort
          </Button>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/add")}
          >
            Add
          </Button>
        </Box>
      </Paper>
      <ContactListItem />
    </>
  );
};

export default ContactPanelContent;
