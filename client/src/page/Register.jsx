import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

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
      const response = await axios.post(
        "http://localhost:8000/api/v1/register",
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // const parseRes = await response.json();
      const parseRes = JSON.stringify(response?.data.token);

      // console.log(parseRes);
      if (parseRes) {
        //localstorage
        localStorage.setItem("token", parseRes);
        setAuth(true);
      } else {
        setAuth(false);
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="App-header">
        <h1>Register</h1>
        <form onSubmit={onSubmitForm}>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
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
            onChange={(e) => {
              onChange(e);
            }}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <br />
          <button>Submit</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Register;
