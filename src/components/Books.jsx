/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useChangeBookStatusMutation } from "../app/booksApi";
import { useDispatch } from "react-redux";
import { setToken } from "../app/userSlice";
import bookLogo from "../assets/books.png";

export default function Books() {
  const { books } = useSelector((state) => state.bookSlice);
  const { token } = useSelector((state) => state.userSlice);
  const [checkout] = useChangeBookStatusMutation();
  const [display, setDisplay] = useState(books);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const searchBooks = (e) => {
    setDisplay(
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          book.author.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const checkoutBook = async (e) => {
    const send = {
      id: e.target.name,
      token: token,
      body: { available: false },
    };
    const result = await checkout(send);
    setDisplay(
      books.map((book) => {
        return result.data.book.id === book.id
          ? { ...book, available: result.data.book.available }
          : book;
      })
    );
  };
  return (
    <div className="booksPage">
      <div className="headers">
        <div className="container">
          <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
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
              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate("/login")}>
                  Account
                </button>
              </li>
              {token && (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => {
                      dispath(setToken(null));
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </header>
        </div>
        <div
          className="input-group mb-3"
          style={{ width: "80%", margin: "auto" }}
        >
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Search
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={searchBooks}
          />
        </div>
      </div>
      <div className="bookBody">
        {display.length ? (
          display.map((book) => {
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
                  className="btn btn-primary"
                  onClick={() => {
                    navigate(`/book/${book.id}`);
                  }}
                >
                  Details
                </button>{" "}
                {book.available && token && (
                  <button
                    name={book.id}
                    className="btn btn-success"
                    onClick={checkoutBook}
                  >
                    Checkout
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div style={{ display: "grid", justifyItems: "center" }}>
            <h1 className="display-3">Book not found</h1>
            <img id="logo-image" src={bookLogo} />
          </div>
        )}
      </div>
    </div>
  );
}
