import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  // const queryRef = useRef(null);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    // const location = queryRef.current.value;
    e.preventDefault();

    const location = query;
    navigate(`/listing/search/${location}`);
  };

  return (
    <div className="container p-5 bd-highlight d-inline-block">
      <form className="input-group" onSubmit={handleQuery}>
        <label htmlFor="location"></label>
        <input
          type="search"
          name="location"
          value={query}
          placeholder="Search location..."
          onChange={(e) => setQuery(e.target.value)}
          required
          className="form-control"
        ></input>
        <button type="submit button" className="btn btn-outline-secondary">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
