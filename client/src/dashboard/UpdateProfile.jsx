import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const UPDATE_USER_URL = "/api/v1/user";
const USER_DATA_URL = "api/v1/profile";

const UpdateProfile = ({ setAuth }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(USER_DATA_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      console.log({
        "get data token": `Bearer ${localStorage.getItem("token")}`,
      });
      const parseRes = response?.data;

      console.log(parseRes);

      setFname(parseRes.fname);
      setLname(parseRes.lname);
      setEmail(parseRes.email);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      fname,
      lname,
      email,
    };

    console.log(fname);

    try {
      await axios.put(UPDATE_USER_URL, JSON.stringify(body), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log({
        "put data token": `Bearer ${localStorage.getItem("token")}`,
      });
    } catch (error) {
      console.log(error);
      console.log({
        "put data token": `Bearer ${localStorage.getItem("token")}`,
      });
    }
  };

  return (
    <section>
      <div className="App-header">
        <div>
          <h1>Update Profile</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstname">First Name:</label>
            <input
              name="firstname"
              value={fname}
              type="text"
              onChange={(e) => {
                setFname(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              name="lastname"
              value={lname}
              type="text"
              onChange={(e) => {
                setLname(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              value={email}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
