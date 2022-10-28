import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="App">
      <div className="App-header">
        <h1>Error 404</h1>
        <p>Page Not Found</p>
        <Link to="/" className="App-link">
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Error;
