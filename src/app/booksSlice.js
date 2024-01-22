import { createSlice } from "@reduxjs/toolkit";
import { booksApi } from "./booksApi";
import { userApi } from "./userApi";

const bookSlice = createSlice({
  name: "bookSlice",
  initialState: {
    books: [],
    book: null,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      booksApi.endpoints.getBooks.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          books: payload.books,
        };
      }
    );
    builder.addMatcher(
      booksApi.endpoints.getBook.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          book: payload.book,
        };
      }
    );
    builder.addMatcher(
      booksApi.endpoints.changeBookStatus.matchFulfilled,
      (state, { payload }) => {
        state.books = state.books.map((book) => {
          return book.id === payload.book.id
            ? { ...book, available: payload.book.available }
            : book;
        });
        return state;
      }
    );
    builder.addMatcher(
      userApi.endpoints.returnBook.matchFulfilled,
      (state, { payload }) => {
        state.books = state.books.map((book) => {
          return book.id === payload.deletedReservation.bookid
            ? { ...book, available: true }
            : book;
        });
        return state;
      }
    );
  },
});

export default bookSlice.reducer;
