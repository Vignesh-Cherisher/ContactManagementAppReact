import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { PhoneNumberGroup } from '../models/phoneList.model';
import { RootState } from ".";
import { PhoneNumberApi } from "../services/phoneNumberList.service";

export const phoneNumberListAdapter = createEntityAdapter({
  sortComparer: (a: PhoneNumberGroup, b: PhoneNumberGroup) =>
    a.id.localeCompare(b.id),
});

const phoneNumberListSlice = createSlice({
  name: "phoneNumberList",
  initialState: phoneNumberListAdapter.getInitialState({
  }),
  reducers: {
    phoneNumberListAddOne: phoneNumberListAdapter.addOne,
    phoneNumberListSetAll: phoneNumberListAdapter.setAll,
    phoneNumberListUpdate: phoneNumberListAdapter.updateOne,
    phoneNumberListRemove: phoneNumberListAdapter.removeOne,
    phoneNumberListUpsertOne: phoneNumberListAdapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
      PhoneNumberApi.endpoints.getPhoneNumberList.matchFulfilled,
      (state, { payload }) => {
        phoneNumberListAdapter.setAll(state, payload);
      }
    );
  },
});

export const {
  selectAll: selectAllPhoneNumber,
  selectById: selectPhoneNumberGroupById,
  selectIds: selectPhoneNumberIds,
} = phoneNumberListAdapter.getSelectors((state: RootState) => state.phoneNumberList);

// export const selectContactList = createSelector((state:RootState) => selectAllContacts(state), (contacts) => contacts ) 

export const phoneNumberListActions = phoneNumberListSlice.actions;

export default phoneNumberListSlice;
