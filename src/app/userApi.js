import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
  }),
  endpoints: (builder) => ({
    oldUser: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body: body,
      }),
    }),
    newUser: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body: body,
      }),
    }),
    getUser: builder.query({
      query: (token) => ({
        url: "/users/me",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getReservtions: builder.query({
      query: (token) => ({
        url: "/reservations",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    returnBook: builder.mutation({
      query: ({token, id}) => ({
        url: `/reservations/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useOldUserMutation,
  useNewUserMutation,
  useGetUserQuery,
  useGetReservtionsQuery,
  useReturnBookMutation,
} = userApi;
