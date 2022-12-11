import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";

const UPDATE_USER_URL = "/api/v1/user/update";
const USER_DATA_URL = "api/v1/profile";

const UpdateProfile = ({ setAuth }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Update Profile | Metrohyve";

    const fetchData = async () => {
      try {
        const response = await axios.get(USER_DATA_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        const parseRes = await response.data;

        setFirstname(parseRes.fname);
        setLastname(parseRes.lname);
        setEmail(parseRes.email);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      fname: firstname,
      lname: lastname,
      email,
    };

    try {
      const updateProfile = await axios.put(UPDATE_USER_URL, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (updateProfile.status === 200 && updateProfile.statusText === "OK") {
        alert(
          `Your profile ${firstname} ${lastname} has been updated successfully!`
        );
        window.location.reload();
      }
      <Navigate to="/dashboard" />;
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <section>
      <div className="container d-flex align-items-center justify-content-center py-5 vh-100">
        <div className="p-4 bg-gradient bg-dark shadow rounded">
          <div className="text-center text-light">
            <h5>Update Profile</h5>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="form-outline mb-2">
              <label className="form-label text-light" htmlFor="firstname">
                First name:
              </label>
              <input
                className="form-control"
                name="firstname"
                value={firstname}
                type="text"
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </div>
            <div className="form-outline mb-2">
              <label className="form-label text-light" htmlFor="lastname">
                Last name:
              </label>
              <input
                className="form-control"
                name="lastname"
                value={lastname}
                type="text"
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label text-light" htmlFor="email">
                Email address:
              </label>
              <input
                className="form-control"
                name="email"
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="d-grid">
              <button
                className="btn btn-warning btn-block mb-2 px-4 bg-gradient"
                type="submit button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
