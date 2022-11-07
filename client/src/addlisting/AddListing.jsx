import React from "react";

const AddListing = () => {
  return (
    <section>
      <div className="App-header">
        <h1>Add Listing</h1>
        <p>This is the Add Listing page.</p>
        <form encType="multipart/form-data">
          <label>Description:</label>
          <br />
          <textarea
            type="text"
            name="description"
            rows="2"
            cols="25"
            required
            autoFocus
          ></textarea>
          <br />
          <label>Price:</label>
          <br />
          <input type="number" name="price" required />
          <br />
          <label>Add Image:</label>
          <br />
          <input type="file" name="image" accept="image/*" multiple required />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default AddListing;
