import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendUrl } from "../constants";
import createSign from "@lib/createSign";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => {
        const key = data.key;
        localStorage.setItem("userKey", key);
        const secret = data.secret;
        localStorage.setItem("userSecret", secret);
        const method = "POST";
        const url = "/signup";
        const body = JSON.stringify(data);

        const sign = createSign(method, url, body, secret);

        return {
          url,
          method,
          headers: { Key: key, Sign: sign, "Content-Type": "application/json" },
          body,
        };
      },
    }),
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
      },
      providesTags: ["Books"],
    }),
    createBook: builder.mutation({
      query: (book) => {
        const key = localStorage.getItem("userKey") as string;
        const secret = localStorage.getItem("userSecret") as string;
        const method = "POST";
        const url = "/books";
        const body = JSON.stringify(book);

        const sign = createSign(method, url, body, secret);

        return {
          url,
          method,
          headers: { Key: key, Sign: sign, "Content-Type": "application/json" },
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
    editBook: builder.mutation({
      query: (book) => {
        const key = localStorage.getItem("userKey") as string;
        const secret = localStorage.getItem("userSecret") as string;
        const method = "PATCH";
        const url = `/books/${book.id}`;
        const body = JSON.stringify(book);

        const sign = createSign(method, url, body, secret);

        return {
          url,
          method,
          headers: { Key: key, Sign: sign, "Content-Type": "application/json" },
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => {
        const key = localStorage.getItem("userKey") as string;
        const secret = localStorage.getItem("userSecret") as string;
        const method = "DELETE";
        const url = `/books/${id}`;
        const body = "";

        const sign = createSign(method, url, body, secret);

        return {
          url,
          method,
          headers: { Key: key, Sign: sign },
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useSignupMutation,
  useGetUserInfoQuery,
  useGetBooksQuery,
  useCreateBookMutation,
  useEditBookMutation,
  useDeleteBookMutation
} = apiService;
