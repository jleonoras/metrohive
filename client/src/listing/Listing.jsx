import React from "react";
import AllListing from "../allListing/AllListing";

const Listing = () => {
  return (
    <section className="App">
      <div className="App-header">
        <h1>Listing</h1>
        <p>This is the Listing page.</p>
        <div>
          <AllListing />
        </div>
      </div>
    </section>
  );
};

export default Listing;
