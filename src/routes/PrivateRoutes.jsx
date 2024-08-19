import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = (props) => {
  const isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/register" />;
};

export default PrivateRoutes;
