import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactItem, ContactItemList } from "../models/contactItem.model";
import { PhoneNumberGroup } from "../models/phoneList.model";
import { EmailAddressGroup } from "../models/emailAddress.model";

type contactImageType = {
  id: number;
  profileImage: File | null;
};

type contactPostType = {
  contact: ContactItem;
  phoneGroup: PhoneNumberGroup;
  emailGroup: EmailAddressGroup;
};

export const contactItemApi = createApi({
  reducerPath: "contactItemApi",
  tagTypes: ["contactItem"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/contacts/" }),
  endpoints: (builder) => ({
    getContactItem: builder.query<ContactItemList, void>({
      query: () => ({ url: "contact-list" }),
      providesTags: () => [{ type: "contactItem" }],
    }),
    postContactItem: builder.mutation<string, contactPostType>({
      query: (body) => {
        console.log(body);
        return {
          url: "upsert",
          method: "POST",
          body: body,
        }
      },
    }),
    postContactImage: builder.mutation<string, contactImageType>({
      query: ({ id, profileImage }) => {
        const formData = new FormData();
        formData.append("profile_image", profileImage!);
        return {
          url: `image/${id}`,
          method: "POST",
          body: formData,
        };
      },
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
  usePostContactImageMutation,
} = contactItemApi;
