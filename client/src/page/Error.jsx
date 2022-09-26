import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section>
      <div>
        <h1>Error 404</h1>
        <p>Page Not Found</p>
      </div>
      <Link to="/">Back to Home</Link>
    </section>
  );
};

export default Error;
