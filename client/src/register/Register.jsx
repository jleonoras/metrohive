import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const REG_URL = "/api/v1/register";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        fname: firstname,
        lname: lastname,
        email: email,
        password: password,
      };
      const response = await axios.post(REG_URL, JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // const parseRes = await response.json();
      const parseRes = await response?.data;

      // console.log(parseRes);
      if (parseRes.token) {
        //localstorage
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
    document.title = "Register | Metrohyve";
  }, []);

  return (
    <section>
      <div className="App-header">
        <h1>Register</h1>
        <form onSubmit={onSubmitForm}>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            required
            autoFocus
            onChange={(e) => {
              onChange(e);
            }}
          />
          <br />
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            required
            onChange={(e) => {
              onChange(e);
            }}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            autoComplete="email"
            required
            onChange={(e) => {
              onChange(e);
            }}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            onChange={(e) => {
              onChange(e);
            }}
          />
          <br />
          <button>Submit</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;
