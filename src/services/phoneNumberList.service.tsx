import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PhoneNumberGroupList } from "../models/phoneList.model";

export const PhoneNumberApi = createApi({
  reducerPath: "PhoneNumberApi",
  tagTypes: ["phoneItem"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getPhoneNumberListById: builder.query<PhoneNumberGroupList, string>({
      query: (id: string) => ({ url: `get-phone-number-list/${id}` }),
      providesTags: () => [{type: "phoneItem"}]
    })
  }),
});

export const { useGetPhoneNumberListByIdQuery } = PhoneNumberApi;