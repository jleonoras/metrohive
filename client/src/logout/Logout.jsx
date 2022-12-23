import React from "react";
import axios from "../api/axios";

const LOGOUT_URL = "/api/v1/logout";

const Logout = () => {
  const handleLogout = async (e) => {
    try {
      const response = await axios.get(LOGOUT_URL, {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="btn btn-danger bg-gradient btn-sm"
      type="button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
