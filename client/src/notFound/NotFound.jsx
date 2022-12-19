import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <section>
      <div className="container">
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <div>
            <h1>Error 404</h1>
          </div>
          <div>
            <span>Page not found.</span>
          </div>
          <div className="p-2" onClick={handleBackToHome}>
            <button className="btn btn-warning bg-gradient" type="button">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
