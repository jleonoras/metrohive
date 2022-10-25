import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const PROFILE_URL = "/api/v1/verify";

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
      console.log(parseRes);
    } catch (error) {
      console.error(error.message);
      console.log(error?.response);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section>
      <div className="App-header">
        <h1>Dashboard</h1>
        <p>This is the Dashboard page.</p>
        <h5>
          {fname} {lname} <br />
        </h5>
        <h5>{email}</h5>
      </div>
    </section>
  );
};

export default Dashboard;
