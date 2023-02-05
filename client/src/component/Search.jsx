import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    e.preventDefault();

    const location = query;
    navigate(`/listing/search/${location}`);
  };

  return (
    <div className="pt-5">
      <div className="container-fluid col-md-5">
        <form className="input-group shadow-sm" onSubmit={handleQuery}>
          <label htmlFor="location"></label>
          <input
            type="search text"
            name="location"
            value={query}
            placeholder="Search location..."
            onChange={(e) => setQuery(e.target.value)}
            required
            className="form-control"
          ></input>
          <button type="button submit" className="btn btn-warning bg-gradient">
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
