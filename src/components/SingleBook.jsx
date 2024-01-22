/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetBookQuery } from "../app/booksApi";
import { setToken } from "../app/userSlice";
import bookLogo from "../assets/books.png";

export default function SingleBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, book } = useSelector((state) => state.bookSlice);
  const { token } = useSelector((state) => state.userSlice);
  const dispath = useDispatch();
  if (!books.length) useGetBookQuery(id);
  const data = books.length
    ? books.filter((book) => book.id === Number(id))
    : [book];
  return (
    <div className="singleBookPage">
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
                <button className="nav-link" onClick={() => navigate("/login")}>
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
      <div className="singleBookBody">
        {(data[0] && (
          <>
            <div className="sImg">
              <img src={data[0].coverimage} alt={data[0].title} />
            </div>
            <div className="sBody">
              <h1 className="display-1">{data[0].title}</h1>
              <h1 className="display-5">{data[0].author}</h1>
              <p className="lead">{data[0].description}</p>
            </div>
          </>
        )) || (
          <div style={{ display: "grid", justifyItems: "center" }}>
            <h1 className="display-3">Book not found</h1>
            <img id="logo-image" src={bookLogo} />
          </div>
        )}
      </div>
    </div>
  );
}
