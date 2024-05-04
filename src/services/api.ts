import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendUrl } from "../constants";
import createSign from "@lib/createSign";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => {
        const key = localStorage.getItem("userKey") as string;
        const secret = localStorage.getItem("userSecret") as string;
        const method = "GET";
        const url = "/myself";
        const body = "";

        const sign = createSign(method, url, body, secret);

        return { url, method, headers: { Key: key, Sign: sign } };
      },
    }),
    getBooks: builder.query({
      query: () => {
        const key = localStorage.getItem("userKey") as string;
        const secret = localStorage.getItem("userSecret") as string;
        const method = "GET";
        const url = "/books";
        const body = "";

        const sign = createSign(method, url, body, secret);

        return { url, method, headers: { Key: key, Sign: sign } };
      }
    }),
  }),
});

export const { useGetUserInfoQuery, useGetBooksQuery } = apiService;
