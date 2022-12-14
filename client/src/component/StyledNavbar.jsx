import React from "react";
import { Link, NavLink } from "react-router-dom";

const Topnav = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light bg-gradient p-3 sticky-top shadow-sm">
      <div className="container-md" id="topnav">
        <Link className="navbar-brand mb-0 h1 text-danger" to="/">
          <strong>Metrohyve</strong>
        </Link>
        <div className="bg-light bg-gradient rounded">
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
        </div>
        <div
          className="navbar-collapse collapse justify-content-between"
          id="nav"
        >
          <ul className="navbar-nav nav-pills mx-2">
            <li className="nav-item">
              <NavLink className="nav-link text-secondary" to="/" end>
                Home
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav nav-pills mx-2 add-listing">
            <li className="nav-item ">
              <NavLink className="nav-link text-secondary" to="/add-listing">
                Add Listing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-secondary" to="/dashboard">
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
