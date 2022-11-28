import React, { useEffect } from "react";

const SearchPage = () => {
  useEffect(() => {
    document.title = "Search Listing | Metrohyve";
  }, []);

  return (
    <section className="App">
      <div className="App-header">
        <div>
          <h3>Search Page</h3>
          <h3>This is the Search Page.</h3>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
