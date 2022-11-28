import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState();

  const { location } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.prevent.Default();
    setSearchInput(e.target.value);
  };

  const handleClick = (e) => {
    navigate(`/listing/search/${location}`);
    console.log(location);
  };

  return (
    <div>
      <form onSubmit={(e) => handleClick(e)}>
        <label htmlFor="location"></label>
        <input
          type="text"
          name="location"
          value={searchInput}
          placeholder="Search location..."
          required
          onChange={handleChange}
        ></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
