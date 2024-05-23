import { configureStore, combineReducers } from "@reduxjs/toolkit";
import contactItemSlice from "./contactItem.slice";
import { contactItemApi } from "../services/contactItem.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import phoneNumberListSlice from "./phoneNumberList.slice";
import { PhoneNumberApi } from "../services/phoneNumberList.service";
import { EmailAddressListApi } from "../services/emailAddressList.service";
import emailAddressListSlice from "./emailAddressList.slice";

const rootReducer = combineReducers({
  [contactItemApi.reducerPath]: contactItemApi.reducer,
  contactItem: contactItemSlice.reducer,
  [PhoneNumberApi.reducerPath]: PhoneNumberApi.reducer,
  phoneNumberList: phoneNumberListSlice.reducer,
  [EmailAddressListApi.reducerPath]: EmailAddressListApi.reducer,
  emailAddressList: emailAddressListSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactItemApi.middleware, PhoneNumberApi.middleware, EmailAddressListApi.middleware),
});

store.dispatch(contactItemApi.endpoints.getContactItem.initiate())

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)

export default store;
