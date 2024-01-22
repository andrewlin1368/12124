import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleBook from "./components/SingleBook";
import Books from "./components/Books";
import bookLogo from "./assets/books.png";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Account from "./components/Account.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App2 from "./App2.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App2></App2>
    {/* <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App></App>}></Route>
          <Route path="*" element={<App></App>}></Route>
          <Route path="/book/:id" element={<SingleBook></SingleBook>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/account" element={<Account></Account>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider> */}
  </React.StrictMode>
);
