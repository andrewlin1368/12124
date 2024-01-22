import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { booksApi } from "./booksApi";

const userSlice = createSlice({
  name: "useSlice",
  initialState: {
    user: null,
    token: null,
    reservations: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.oldUser.matchFulfilled,
      (state, { payload }) => {
        return { ...state, token: payload.token };
      }
    );
    builder.addMatcher(
      userApi.endpoints.newUser.matchFulfilled,
      (state, { payload }) => {
        return { ...state, token: payload.token };
      }
    );
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          user: payload,
        };
      }
    );
    builder.addMatcher(
      booksApi.endpoints.changeBookStatus.matchFulfilled,
      (state, { payload }) => {
        state.user.books.push(payload.book);
        return state;
      }
    );
    builder.addMatcher(
      userApi.endpoints.getReservtions.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          reservations: payload.reservation,
        };
      }
    );
    builder.addMatcher(
      userApi.endpoints.returnBook.matchFulfilled,
      (state, { payload }) => {
        state.user.books = state.user.books.filter(
          (book) => book.id !== payload.deletedReservation.id
        );
        return state;
      }
    );
  },
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
