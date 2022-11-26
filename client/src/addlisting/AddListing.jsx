import React, { useState } from "react";
import axios from "../api/axios";

const NEW_LISTING_URL = "/api/v1/user/new/listing";

const AddListing = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    formData.append("location", location);
    formData.append("price", price);

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    try {
      const response = await axios.post(NEW_LISTING_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // If the response status is 200 and status text is ok this will run reset input
      if (response.status === 200 && response.statusText === "OK") {
        // Clear input field after submit
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <section>
      <div className="App-header">
        <h1>Add Listing</h1>
        <p>This is the Add Listing page.</p>
        <form
          onSubmit={(e) => {
            onSubmitForm(e);
          }}
          encType="multipart/form-data"
        >
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            type="text"
            name="description"
            rows="2"
            cols="25"
            required
            autoFocus
            onChange={(e) => {
              const { value } = e.target;
              setDescription(value);
            }}
          ></textarea>
          <br />
          <label htmlFor="location">Location:</label>
          <br />
          <input
            type="text"
            name="location"
            id="location"
            onChange={(e) => {
              const { value } = e.target;
              setLocation(value);
            }}
            required
          />
          <br />
          <label htmlFor="price">Price:</label>
          <br />
          <input
            type="number"
            name="price"
            id="price"
            onChange={(e) => {
              const { value } = e.target;
              setPrice(value);
            }}
            required
          />
          <br />
          <label htmlFor="file">Add Image:</label>
          <br />
          <input
            type="file"
            name="file"
            id="file"
            accept="image/*"
            multiple
            required
            onChange={(e) => {
              const file = e.target.files;
              // console.log(file);
              setFiles(file);
            }}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default AddListing;
