import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./home/Home";
import Login from "./login/Login";
import Error from "./error/Error";
import "./component/nav.css";
import Register from "./register/Register";
import Dashboard from "./dashboard/Dashboard";
import axios from "./api/axios";
import AddListing from "./addlisting/AddListing";
import SingleListing from "./singleListing/SingleListing";
import UpdateProfile from "./dashboard/UpdateProfile";
import Result from "./result/Result";
import Topnav from "./component/StyledNavbar";

const VERIFY_URL = "/api/v1/verify";

function App() {
  // Check the token is authenticated
  const checkAuthenticated = async () => {
    try {
      const response = await axios.get(VERIFY_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const parseRes = response.data;

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      // console.log(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <BrowserRouter>
      <Topnav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          // Login Route
          // If the user token is authenticated will redirect to dashboard if not redirected to login
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          // Register route
          // If the user token is authenticated will redirect to dashboard page if not redirected to register
          path="/register"
          element={
            !isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          //  Dashboard route
          //  If the user token is authenticated will redirect to dashboard if not will redirect to login
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          // If the user token is authenticated will redirect to add listing if not redirected to login
          path="/add-listing"
          element={
            isAuthenticated ? (
              <AddListing setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Route to listing detail page */}
        <Route
          // Route to update profile
          // If user token is authenticated will redirect to update profile page if not redirected to login
          path="/dashboard/update/:user/:userId/"
          element={
            isAuthenticated ? (
              <UpdateProfile setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/listing/:id" element={<SingleListing />} />
        <Route path="/listing/search/:location" element={<Result />} />
        {/* Route to error page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
