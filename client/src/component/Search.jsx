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
    <div>
      <form onSubmit={handleQuery}>
        <label htmlFor="location"></label>
        <input
          type="text"
          name="location"
          value={query}
          placeholder="Search location..."
          onChange={(e) => setQuery(e.target.value)}
          required
        ></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
