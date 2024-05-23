import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { ContactItem } from "../models/contactItem.model";
import { RootState } from ".";
import { contactItemApi } from "../services/contactItem.service";

export const contactItemAdapter = createEntityAdapter({
  sortComparer: (a: ContactItem, b: ContactItem) =>
    a.fName.localeCompare(b.fName),
});

const searchContactByName = (
  contactList: ContactItem[],
  searchQuery: string
) => {
  return contactList.filter((item: ContactItem) =>
    JSON.stringify({ fName: item.fName, lName: item.lName })
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
};

const filterFavContactList = (
  contactList: ContactItem[],
  isFavFiltered: boolean
) => {
  if (isFavFiltered) {
    return contactList.filter((contactItem: ContactItem) => contactItem.isFav);
  }
  return contactList;
};

const sortContactListByName = (
  contactList: ContactItem[],
  isSortedDesc: boolean
) => {
  if (isSortedDesc) {
    return contactList.sort((a: ContactItem, b: ContactItem) =>
      a.fName > b.fName ? -1 : a.fName < b.fName ? 1 : 0
    );
  }
  return contactList.sort((a: ContactItem, b: ContactItem) =>
    a.fName > b.fName ? 1 : a.fName < b.fName ? -1 : 0
  );
};

const contactItemSlice = createSlice({
  name: "contactItems",
  initialState: contactItemAdapter.getInitialState({
    isLoading: false,
    isSortedDesc: false,
    isFavoritesFiltered: false,
    searchText: "",
    transformedContacts: [] as ContactItem[],
  }),
  reducers: {
    contactItemAddOne: contactItemAdapter.addOne,
    contactItemSetAll: contactItemAdapter.setAll,
    contactItemUpdate: contactItemAdapter.updateOne,
    contactItemRemove: contactItemAdapter.removeOne,
    contactItemRemoveAll: contactItemAdapter.removeAll,
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    contactListOperationsHandler(state, {payload}) {
      if (payload === "filter")
        state.isFavoritesFiltered = !state.isFavoritesFiltered;
      else state.isSortedDesc = !state.isSortedDesc;
      let allContacts = state.transformedContacts;
      if (
        state.transformedContacts.length === 0 ||
        !state.isFavoritesFiltered
      ) {
        allContacts = contactItemAdapter.getSelectors().selectAll(state);
      }
      allContacts = sortContactListByName(allContacts, state.isSortedDesc);
      state.transformedContacts = filterFavContactList(
        allContacts,
        state.isFavoritesFiltered
      );
    },
    searchContactHandler(state, action) {
      state.searchText = action.payload;
      const allContacts = contactItemAdapter.getSelectors().selectAll(state);
      state.transformedContacts = searchContactByName(
        allContacts,
        state.searchText
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      contactItemApi.endpoints.getContactItem.matchFulfilled,
      (state, { payload }) => {
        contactItemAdapter.setAll(state, payload);
        state.transformedContacts = Object.values(payload);
      }
    );
  },
});

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById,
  selectIds: selectContactIds,
} = contactItemAdapter.getSelectors((state: RootState) => state.contactItem);

// export const selectContactList = createSelector((state:RootState) => selectAllContacts(state), (contacts) => contacts )

export const contactItemActions = contactItemSlice.actions;

export default contactItemSlice;
