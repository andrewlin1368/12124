/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useEffect } from "react";
import Account from "./Account";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNewUserMutation } from "../app/userApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { token } = useSelector((state) => state.userSlice);
  const [newPerson] = useNewUserMutation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const newUser = async (e) => {
    e.preventDefault();
    const result = await newPerson(form);
    if (result.error) {
      setMessage(result.error.data.message);
      return;
    }
    navigate("/account");
  };
  // if (token) {
  //   useEffect(() => {
  //     navigate("/account");
  //   });
  // }
  useEffect(() => {
    const goAccount = () => {
      navigate("/account");
    };
    if (token) goAccount();
  }, []);

  return (
    <div className="loginPage">
      <div className="container">
        <header className="d-flex justify-content-center py-3">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate("/")}>
                Home
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate("/login")}>
                Login
              </button>
            </li>
          </ul>
        </header>
      </div>
      {!token && (
        <form onSubmit={newUser} className="form">
          <h1 className="display-3">Sign Up</h1>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="firstname"
              onChange={updateForm}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastname"
              onChange={updateForm}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              name="email"
              onChange={updateForm}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={updateForm}
              required
            />
          </div>
          <p className="text-danger">{message}</p>
          <button type="submit" className="btn btn-primary mb-3">
            Sign Up
          </button>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      )}
    </div>
  );
}
