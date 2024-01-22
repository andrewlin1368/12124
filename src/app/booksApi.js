import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({ query: () => "/books" }),
    getBook: builder.query({ query: (id) => `/books/${id}` }),
    changeBookStatus: builder.mutation({
      query: ({ id, body, token }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useChangeBookStatusMutation,
} = booksApi;
