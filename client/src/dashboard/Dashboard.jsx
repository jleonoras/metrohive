import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import UserListing from "../userListing/UserListing";
import { useNavigate } from "react-router-dom";
import avatar from "../avatar.png";

const PROFILE_URL = "/api/v1/profile";

const Dashboard = ({ setAuth }) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Account | Metrohyve";

    const getProfile = async () => {
      try {
        const response = await axios.get(PROFILE_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        const parseRes = await response.data;
        setFName(parseRes.fname);
        setLName(parseRes.lname);
        setEmail(parseRes.email);
        setUserId(parseRes.user_id);
        // console.log(parseRes);
      } catch (error) {
        console.log(error);
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
    }
  };

  const handleUpdate = (e) => {
    navigate(`/dashboard/update/${fname}/${userId}`);
  };

  return (
    <section>
      <div className="container py-5 vh-100">
        <div className="col-md-4 shadow">
          <div className="card-mb-4 m-2 py-4">
            <div className="card-body text-center">
              <img
                className="rounded-circle img-fluid w-25"
                src={avatar}
                alt="avatar"
                loading="lazy"
              />
              <h5 className="my-2">
                {fname} {lname}
              </h5>
            </div>
            <div className="d-flex justify-content-center mb-2">
              <span>{email}</span>
            </div>
            <div className="justify-content-center text-center">
              <div>
                <button
                  className="btn btn-warning bg-gradient col-md-3 btn-sm"
                  type="button"
                  onClick={(e) => handleUpdate(e)}
                >
                  Edit Profile
                </button>
              </div>
              <div>
                <button
                  className="btn btn-danger bg-gradient col-md-3 m-2 btn-sm"
                  type="button"
                  onClick={(e) => handleLogout(e)}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <UserListing />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
