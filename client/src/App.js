import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import Error from "./page/Error";
import "./component/nav.css";
import Register from "./page/Register";
import Navbar from "./component/StyledNavbar";
import AddListing from "./page/AddListing";
import Listing from "./page/Listing";
import Dashboard from "./page/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
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
          path="/dashboard"
          element={
            !isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/addlisting" element={<AddListing />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
