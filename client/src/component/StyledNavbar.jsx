import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-black fixed-top">
      <div className="container" id="topnav">
        <Link className="navbar-brand container-inline" to="/">
          <img
            className="d-inline-block align-top"
            src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg"
            alt=""
            width="35"
            height="30"
            loading="lazy"
            id="brandLogo"
          ></img>
          Metrohive
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
          <ul className="navbar-nav  nav-pills">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/listing">
                Listing
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav nav-pills">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/addlisting">
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

export default Navbar;
