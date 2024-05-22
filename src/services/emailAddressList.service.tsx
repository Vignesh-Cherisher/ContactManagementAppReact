import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EmailAddressGroupList } from "../models/emailAddress.model";

export const EmailAddressListApi = createApi({
  reducerPath: "EmailAddressListApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getEmailAddressList: builder.query<EmailAddressGroupList, void>({
      query: () => ({ url: "get-email-list" })
    }),
  }),
});

export const { useGetEmailAddressListQuery } = EmailAddressListApi;