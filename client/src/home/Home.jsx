import React, { useEffect } from "react";
import AllListing from "../allListing/AllListing";
import "../App.css";
import Search from "../component/Search";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Metrohyve";
  }, []);

  return (
    <section className="App">
      <div className="App-header">
        <h1>Home</h1>
        <p>This is the Home page.</p>
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
