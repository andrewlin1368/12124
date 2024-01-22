/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import {
  useGetReservtionsQuery,
  useGetUserQuery,
  useReturnBookMutation,
} from "../app/userApi";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../app/userSlice";
import bookLogo from "../assets/books.png";

export default function Account() {
  const { token, user, reservations } = useSelector((state) => state.userSlice);
  //   const [getData] = useGetUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [giveBack] = useReturnBookMutation();
  const check = () => {
    useEffect(() => {
      navigate("/login");
    }, []);
  };
  if (!token) check();
  if (token) {
    useGetUserQuery(token, { refetchOnMountOrArgChange: true });
    // console.log("user", user);
    // const data = async () => {
    //   const result = await axios.get(
    //     "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log("result", result);
    // };
    // data();
  }
  const [data, setData] = useState(user);
  const returnBook = async (e) => {
    const result = await giveBack({ token: token, id: e.target.id });
    setData([]);
  };
  return (
    token &&
    user && (
      <div className="accountPage">
        <div className="container">
          <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate("/")}>
                  Home
                </button>
              </li>
              {!token && (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </li>
              )}
              {token && (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => {
                      dispatch(setToken(null));
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </header>
        </div>
        <div className="userInfo">
          <blockquote className="blockquote text-center">
            <p className="mb-2">
              Welcome {user.firstname || "User"} {user.lastname || "User"}!
            </p>
            <footer className="blockquote-footer">
              <cite title="Source Title">{user.email}</cite>
            </footer>
          </blockquote>
        </div>
        <div className="bookBody">
          {!user.books.length && (
            <div style={{ display: "grid", justifyItems: "center" }}>
              <h1 className="display-3">No books checkout</h1>
              <img id="logo-image" src={bookLogo} />
            </div>
          )}
          {user.books.map((book) => {
            return (
              <div
                key={book.id}
                className="card"
                style={{ width: "18rem", margin: "5px" }}
              >
                <img
                  src={book.coverimage}
                  className="card-img-top"
                  alt={book.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.author}</p>
                </div>
                <button
                  id={book.id}
                  className="btn btn-primary"
                  onClick={returnBook}
                >
                  Return
                </button>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
