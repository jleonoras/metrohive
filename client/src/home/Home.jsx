import React from "react";
import AllListing from "../allListing/AllListing";
import "../App.css";

const Home = () => {
  return (
    <section className="App">
      <div className="App-header">
        <h1>Home</h1>
        <p>This is the Home page.</p>
        <div>
          <AllListing />
        </div>
      </div>
    </section>
  );
};

export default Home;
