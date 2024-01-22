import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./booksSlice";
import { booksApi } from "./booksApi";
import userSlice from "./userSlice";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    bookSlice,
    userSlice,
    [booksApi.reducerPath]: booksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, userApi.middleware),
});
