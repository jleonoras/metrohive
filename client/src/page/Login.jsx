import React from "react";
import { useState, useEffect, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

import axios from "../api/axios";
import { Link } from "react-router-dom";
import Profile from "./Profile";
const LOGIN_URL = "/api/v1/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
          },
          withCredentials: false, // this supposed to be true...
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      setAuth({ email, password, accessToken });
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No Server Response...");
      } else if (error.response?.status === 400) {
        setErrorMsg("Missing Email or Password");
      } else if (errorMsg.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <div>
          <Profile />
          <Link to="/" className="App-link">
            Go to Home
          </Link>
        </div>
      ) : (
        <section className="App-header">
          <p ref={errorRef} className={errorMsg ? "errorMsg" : "offscreen"}>
            {errorMsg}
          </p>
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              ref={userRef}
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
