import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ContactItem } from "../models/contactItem.model";
import { RootState } from ".";

export const contactItemAdapter = createEntityAdapter({
  sortComparer: (a: ContactItem, b: ContactItem) =>
    a.fName.localeCompare(b.fName),
});

const contactItemSlice = createSlice({
  name: "cartItems",
  initialState: contactItemAdapter.getInitialState({
    isSortedDesc: false,
    appliedFilters: [],
    searchText
  }),
  reducers: {
    contactItemAddOne: contactItemAdapter.addOne,
    contactItemSetAll: contactItemAdapter.setAll,
    contactItemUpdate: contactItemAdapter.updateOne,
    contactItemRemove: contactItemAdapter.removeOne,
    contactItemRemoveAll: contactItemAdapter.removeAll,
    sortListHandler(state) {
      state.isSortedDesc = !state.isSortedDesc
    }
  },
});

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById,
  selectIds: selectContactIds,
} = contactItemAdapter.getSelectors((state: RootState) => state.contactItem);

export const contactItemActions = contactItemSlice.actions;

export default contactItemSlice;
