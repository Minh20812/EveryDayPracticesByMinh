import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const hideNavbarPaths = ["/register"]; // Các trang mà bạn muốn ẩn Navbar
  const isHidden = hideNavbarPaths.includes(path);
  return (
    <>
      <div
        className={` flex justify-center items-center gap-4 bg-slate-600 text-white ${
          isHidden ? "hidden" : ""
        }`}
      >
        <Link to="/">Home</Link>
        <Link to="/user">User</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </>
  );
};

export default Navbar;
