import React, { useState } from "react";
import axios from "../api/axios";

const Register = () => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = input;

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
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
            "Content-type": "application/json",
          },
        }
      );

      // const parseRes = await response.json();

      // console.log(parseRes);

      console.log(JSON.stringify(response?.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="App-header">
        <h1>Register</h1>
        <form onSubmit={onSubmitForm} action="">
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
      </div>
    </>
  );
};

export default Register;
