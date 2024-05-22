import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PhoneNumberGroupList } from "../models/phoneList.model";

export const PhoneNumberApi = createApi({
  reducerPath: "PhoneNumberApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getPhoneNumberList: builder.query<PhoneNumberGroupList, void>({
      query: () => ({ url: "get-phone-number-list" })
    }),
  }),
});

export const { useGetPhoneNumberListQuery } = PhoneNumberApi;