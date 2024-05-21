import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactItemList } from '../models/contactItem.model';

export const contactItemApi = createApi({
  reducerPath: "contactItemApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getContactItem: builder.query<ContactItemList, void>({
      query: () => ({ url: "get-contact-items" })
    }),
  }),
});

export const { useGetContactItemQuery } = contactItemApi;
