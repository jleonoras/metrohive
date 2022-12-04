import React from "react";
import { Link, NavLink } from "react-router-dom";

const Topnav = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark p-3 sticky-top">
      <div className="container-md" id="topnav">
        <Link className="navbar-brand mb-0 h1" to="/">
          Metrohyve
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          type="button"
          aria-controls="nav"
          aria-label="Expand Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="navbar-collapse collapse justify-content-between"
          id="nav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/add-listing">
                Add Listing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
