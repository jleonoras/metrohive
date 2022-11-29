import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const queryRef = useRef(null);

  const handleQuery = (e) => {
    const location = queryRef.current.value;
    navigate(`/listing/search/${location}`);
  };

  return (
    <div>
      <label htmlFor="location"></label>
      <input
        type="text"
        name="location"
        ref={queryRef}
        placeholder="Search location..."
        required
      ></input>
      <button type="submit" onClick={handleQuery}>
        Search
      </button>
    </div>
  );
};

export default Search;
