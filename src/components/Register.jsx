import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const UserRegex = /^[A-Z][a-zA-Z0-9.-]{3,23}$/;
const PasswordRegex = /^(?=.*[a-z]).{0,24}$/;
const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RegisterURL = "/register";

const Register = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validUser, setValidUser] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  const [focusUser, setFocusUser] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUser(UserRegex.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EmailRegex.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PasswordRegex.test(password));
    setValidConfirmPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setError("");
  }, [user, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const t1 = UserRegex.test(user);
    const t2 = EmailRegex.test(email);
    const t3 = PasswordRegex.test(password);

    if (!t1 || !t2 || !t3) {
      setError("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        RegisterURL,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: false,
          },
        }
      );
      console.log(response.data.id);
      console.log(response.data.token);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUser("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response.data.error);
    }
    // if (validUser && validEmail && validPassword && validConfirmPassword) {
    //   setSuccess(true);
    // } else {
    //   setError("Please fill in all fields");
    //   errorRef.current.focus();
    // }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/login">Login</Link>
          </p>
        </section>
      ) : (
        <section className=" flex flex-col items-center justify-center gap-8">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              {/* User  */}
              <label htmlFor="user">Username</label>
              <input
                type="text"
                id="user"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                onFocus={() => setFocusUser(true)}
                onBlur={() => setFocusUser(false)}
              />
              {focusUser && !validUser && (
                <p>Invalid Username. Please enter a valid username.</p>
              )}
              {/* Email  */}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
              />
              {focusEmail && !validEmail && (
                <p>Invalid Email. Please enter a valid email.</p>
              )}
              {/* Password  */}
              <label htmlFor="psw">Password</label>
              <input
                type="password"
                id="psw"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
              />
              {focusPassword && !validPassword && (
                <p>Invalid Password. Please enter a valid password.</p>
              )}
              {/* Confirm Password  */}
              <label htmlFor="cfpw">Confirm Password</label>
              <input
                type="password"
                id="cfpw"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                onFocus={() => setFocusConfirmPassword(true)}
                onBlur={() => setFocusConfirmPassword(false)}
              />
              {focusConfirmPassword && !validConfirmPassword && (
                <p>Passwords do not match.</p>
              )}
              {/* Register  */}
              <button type="submit" className=" bg-slate-400">
                Register
              </button>
            </div>
          </form>
          {error && (
            <p ref={errorRef} className="error-message">
              {error}
            </p>
          )}
          <p className="flex flex-col items-center justify-center">
            Already registered?
            <Link to="/login">Login</Link>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
