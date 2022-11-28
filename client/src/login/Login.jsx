import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const LOGIN_URL = "/api/v1/login";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { email, password } = inputs;

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await axios.post(LOGIN_URL, JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(JSON.stringify(response?.data));
      const parseRes = response?.data;

      if (parseRes.token) {
        // localstorage
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        setAuth(false);
        console.log("Something went wrong");
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login | Metrohyve";
  }, []);

  return (
    <section>
      <div className="App-header">
        <h1>Login</h1>
        <form className="login-form" onSubmit={onSubmitForm}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            autoComplete="email"
            required
            autoFocus
            onChange={(e) => {
              onChange(e);
            }}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
            onChange={(e) => {
              onChange(e);
            }}
          />
          <br />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        <Link to="/register">Register</Link>
      </div>
    </section>
  );
};

export default Login;
