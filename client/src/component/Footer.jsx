import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <section>
      <div className="sticky-bottom pt-auto">
        <footer className="bg-light bg-gradient">
          {/* <!-- Copyright --> */}
          <div className="text-center text-secondary p-3">
            <span>{`Copyright © ${year} by `}</span>
            <Link className="text-danger text-decoration-none" to="/">
              <strong>Metrohyve</strong>
            </Link>
            . All Rights Reserved.
          </div>
          {/* <!-- Copyright --> */}
        </footer>
      </div>
    </section>
  );
};

export default Footer;
