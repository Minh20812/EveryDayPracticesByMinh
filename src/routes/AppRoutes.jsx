import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import User from "../components/User.jsx";
import App from "../App.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";

const AppRoutes = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/user" element={<User />} />
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
