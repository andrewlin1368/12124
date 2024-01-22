/* TODO - add your code to create a functional React component that renders a login form */
import React, { useEffect, useState } from "react";
import Register from "./Register";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Account from "./Account";
import { useOldUserMutation } from "../app/userApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { token } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [oldUser] = useOldUserMutation();
  const formChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const login = async (e) => {
    e.preventDefault();
    const result = await oldUser(form);
    if (result.error) setMessage(result.error.data.message);
    else navigate("/account");
  };
  // if (token) {
  //   useEffect(() => {
  //     navigate("/account");
  //   }, []);
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
            {!token && (
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </li>
            )}
          </ul>
        </header>
      </div>
      {!token && (
        <form onSubmit={login} className="form">
          <h1 className="display-3">Login</h1>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              name="email"
              onChange={formChange}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={formChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>
          <p className="text-danger">{message}</p>
          <p>
            No account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      )}
    </div>
  );
}
