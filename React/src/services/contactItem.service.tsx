import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactItemList } from "../models/contactItem.model";
import { formStateType } from "../components/ContactForm/contactFormView";

export const contactItemApi = createApi({
  reducerPath: "contactItemApi",
  tagTypes: ["contactItem"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/contacts/" }),
  endpoints: (builder) => ({
    getContactItem: builder.query<ContactItemList, void>({
      query: () => ({ url: "contact-list" }),
      providesTags: () => [{ type: "contactItem" }],
    }),
    postContactItem: builder.mutation<string, formStateType>({
      query: (body) => ({
        url: "upsert",
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => [{ type: "contactItem" }],
    }),
    deleteContactItem: builder.mutation<string, string>({
      query(id) {
        return {
          url: `${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "contactItem" }],
    }),
  }),
});

export const {
  useGetContactItemQuery,
  useDeleteContactItemMutation,
  usePostContactItemMutation,
} = contactItemApi;
