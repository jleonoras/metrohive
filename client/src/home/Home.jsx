import React, { useEffect } from "react";
import AllListing from "../allListing/AllListing";
import "../App.css";
import Search from "../component/Search";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Metrohyve";
  }, []);

  return (
    <section>
      <div>
        <div>
          <div>
            <Search />
          </div>
          <div>
            <AllListing />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
