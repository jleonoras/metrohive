import React from "react";
import { Outlet } from "react-router-dom";
import StyledNavbar from "../component/StyledNavbar";

const Home = () => {
  return (
    <>
      <StyledNavbar />
      <Outlet />
    </>
  );
};

export default Home;
