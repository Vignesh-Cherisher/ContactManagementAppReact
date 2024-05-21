import { configureStore, combineReducers } from "@reduxjs/toolkit";
import contactItemSlice from "./contactItem.slice";
import { contactItemApi } from "../services/contactItem.service";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [contactItemApi.reducerPath]: contactItemApi.reducer,
  contactItem: contactItemSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactItemApi.middleware),
});

setupListeners(store.dispatch)

export default store;
