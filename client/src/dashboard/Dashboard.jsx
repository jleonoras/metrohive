import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import UserListing from "../userListing/UserListing";

const PROFILE_URL = "/api/v1/profile";

const Dashboard = ({ setAuth }) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");

  const getProfile = async () => {
    try {
      const response = await axios.get(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const parseRes = await response?.data;
      setFName(parseRes.fname);
      setLName(parseRes.lname);
      setEmail(parseRes.email);
      // console.log(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  const logoutButton = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (error) {
      console.log(error);
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="App">
      <div className="App-header">
        <h1>Dashboard</h1>
        <p>This is the Dashboard page.</p>
        <div>
          <h2>
            {fname} {lname}
          </h2>
        </div>
        <div>
          <h5>{email}</h5>
        </div>
        <div>
          <button onClick={(e) => logoutButton(e)}>Logout</button>
        </div>
        <br />
        <div>
          <UserListing />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
