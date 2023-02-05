import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./home/Home";
import Login from "./login/Login";
import NotFound from "./notFound/NotFound";
import Register from "./register/Register";
import Dashboard from "./dashboard/Dashboard";
import axios from "./api/axios";
import AddListing from "./addlisting/AddListing";
import SingleListing from "./singleListing/SingleListing";
import UpdateProfile from "./dashboard/UpdateProfile";
import Result from "./result/Result";
import Topnav from "./component/StyledNavbar";
import Footer from "./component/Footer";
import "react-datepicker/dist/react-datepicker.css";
import BookedListing from "./bookedListing/BookedListing";

const VERIFY_URL = "/api/v1/verify";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check the token is authenticated
    const checkAuthenticated = async () => {
      try {
        const response = await axios.get(VERIFY_URL, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const parseRes = response.data;

        setIsAuthenticated(parseRes);
      } catch (error) {
        if (error.response.data === "jwt expired") {
          console.log("Session expired!");
        }
      }
    };
    checkAuthenticated();
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <BrowserRouter>
      <header>
        <Topnav />
      </header>
      <section className="min-vh-100">
        <div className="pb-5">
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
            <Route
              // Route to bookings by listing id
              // If user token is authenticated will redirect to update profile page if not redirected to login
              path="/listing/:id/reservations"
              element={
                isAuthenticated ? (
                  <BookedListing setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/listing/:id" element={<SingleListing />} />
            <Route path="/listing/search/:location" element={<Result />} />
            {/* Route to error page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </section>
      <footer className="position-relative">
        <Footer />
      </footer>
    </BrowserRouter>
  );
};

export default App;
