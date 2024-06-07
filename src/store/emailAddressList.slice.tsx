import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { EmailAddressGroup } from '../models/emailAddress.model';
import { EmailAddressListApi } from "../services/emailAddressList.service";

export const emailAddressListAdapter = createEntityAdapter({
  sortComparer: (a: EmailAddressGroup, b: EmailAddressGroup) =>
    a.id.localeCompare(b.id),
});

const emailAddressListSlice = createSlice({
  name: "emailAddressList",
  initialState: emailAddressListAdapter.getInitialState({
  }),
  reducers: {
    emailAddressListAddOne: emailAddressListAdapter.addOne,
    emailAddressListUpsertOne: emailAddressListAdapter.upsertOne,
    emailAddressListSetAll: emailAddressListAdapter.setAll,
    emailAddressListUpdate: emailAddressListAdapter.updateOne,
    emailAddressListRemove: emailAddressListAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
      EmailAddressListApi.endpoints.getEmailAddressList.matchFulfilled,
      (state, { payload }) => {
        emailAddressListAdapter.setAll(state, payload);
      }
    );
  },
});

export const {
  selectById: selectEmailAddressListById,
  selectIds: selectEmailAddressListIds,
} = emailAddressListAdapter.getSelectors((state: RootState) => state.emailAddressList);

// export const selectContactList = createSelector((state:RootState) => selectAllContacts(state), (contacts) => contacts ) 

export const emailAddressListActions = emailAddressListSlice.actions;

export default emailAddressListSlice;
