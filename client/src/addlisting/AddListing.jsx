import React, { useState } from "react";
import axios from "../api/axios";

const NEW_LISTING_URL = "/api/v1/user/new/listing";

const AddListing = ({ setAuth }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("price", price);

    // axios
    //   .post(NEW_LISTING_URL, formData)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));

    try {
      const response = await axios.post(NEW_LISTING_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="App-header">
        <h1>Add Listing</h1>
        <p>This is the Add Listing page.</p>
        <form encType="multipart/form-data">
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
              setFile(file);
              setFile(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <br />
          <button onClick={onSubmitForm}>Submit</button>
        </form>
        <img src={file} alt="" />
      </div>
    </section>
  );
};

export default AddListing;
