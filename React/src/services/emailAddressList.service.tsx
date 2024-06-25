import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EmailAddressGroupList } from "../models/emailAddress.model";

export const EmailAddressListApi = createApi({
  reducerPath: "EmailAddressListApi",
  tagTypes: ["emailItem"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/emails/" }),
  endpoints: (builder) => ({
    getEmailAddressListById: builder.query<EmailAddressGroupList, string>({
      query: (id: string) => ({ url: `${id}` }),
      providesTags: () => [{type: "emailItem"}]
    })
  }),
});

export const { useGetEmailAddressListByIdQuery } = EmailAddressListApi;