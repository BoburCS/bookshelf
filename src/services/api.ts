import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendUrl } from "../constants";
import createSign from "@lib/createSign";

const createRequest = (method: string, url: string, body: string | null) => {
  const key = localStorage.getItem("userKey") as string;
  const secret = localStorage.getItem("userSecret") as string;
  const sign = createSign(method, url, body || "", secret);

  return {
    url,
    method,
    headers: {
      Key: key,
      Sign: sign,
      ...(body && { "Content-Type": "application/json" }),
    },
    ...(body && { body }),
  };
};

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => {
        localStorage.setItem("userKey", data.key);
        localStorage.setItem("userSecret", data.secret);
        return createRequest("POST", "/signup", JSON.stringify(data));
      },
    }),
    getUserInfo: builder.query({
      query: () => createRequest("GET", "/myself", null),
    }),
    getBooks: builder.query({
      query: () => createRequest("GET", "/books", null),
      providesTags: ["Books"],
    }),
    createBook: builder.mutation({
      query: (book) => createRequest("POST", "/books", JSON.stringify(book)),
      invalidatesTags: ["Books"],
    }),
    editBook: builder.mutation({
      query: (book) =>
        createRequest("PATCH", `/books/${book.id}`, JSON.stringify(book)),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => createRequest("DELETE", `/books/${id}`, null),
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
  useDeleteBookMutation,
} = apiService;
