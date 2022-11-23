import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import UserListing from "../userListing/UserListing";
import { useNavigate } from "react-router-dom";

const PROFILE_URL = "/api/v1/profile";

const Dashboard = ({ setAuth }) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(PROFILE_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        const parseRes = await response?.data;
        setFName(parseRes.fname);
        setLName(parseRes.lname);
        setEmail(parseRes.email);
        setUserId(parseRes.user_id);
        // console.log(parseRes);
      } catch (error) {
        console.error(error.message);
      }
    };
    getProfile();
  }, []);

  const handleLogout = (e) => {
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (error) {
      console.log(error);
      console.error(error.message);
    }
  };

  const handleUpdate = (e) => {
    navigate(`/dashboard/update/${fname}/${userId}`);
  };

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
          <button onClick={(e) => handleUpdate(e)}>Update</button>
          <button onClick={(e) => handleLogout(e)}>Logout</button>
        </div>
        <div>
          <UserListing />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
