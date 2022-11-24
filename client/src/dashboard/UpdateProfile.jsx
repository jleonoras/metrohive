import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const UPDATE_USER_URL = "/api/v1/user/update";
const USER_DATA_URL = "api/v1/profile";

const UpdateProfile = ({ setAuth }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(USER_DATA_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const parseRes = response?.data;

      console.log(parseRes);

      setFirstname(parseRes.fname);
      setLastname(parseRes.lname);
      setEmail(parseRes.email);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fname: firstname,
      lname: lastname,
      email,
    };

    console.log({ stringify: JSON.stringify(data) });
    console.log({ plain: data });

    try {
      const updateProfile = await axios.patch(
        UPDATE_USER_URL,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(updateProfile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="App-header">
        <div>
          <h1>Update Profile</h1>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <label htmlFor="fname">First Name:</label>
            <input
              name="firstname"
              value={firstname}
              type="text"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="lname">Last Name:</label>
            <input
              name="lastname"
              value={lastname}
              type="text"
              onChange={(e) => {
                setLastname(e.target.value);
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
