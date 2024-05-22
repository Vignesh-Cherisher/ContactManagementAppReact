import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactItemList } from "../models/contactItem.model";

export const contactItemApi = createApi({
  reducerPath: "contactItemApi",
  tagTypes: ['contactItem'],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getContactItem: builder.query<ContactItemList, void>({
      query: () => ({ url: "get-contact-items" }),
      providesTags: () => [{type:'contactItem'}]
    }),
    deleteContactItem: builder.mutation<string, string>({
      query(id) {
        const body = { id };
        return {
          url: "delete-contact-item",
          method: "POST",
          
          body,
        };
      },
      invalidatesTags: () => [{ type: 'contactItem'}],
    }),
  }),
});

export const { useGetContactItemQuery, useDeleteContactItemMutation } =
  contactItemApi;
