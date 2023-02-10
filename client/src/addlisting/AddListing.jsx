import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const NEW_LISTING_URL = "/api/v1/user/new/listing";
const PROFILE_URL = "/api/v1/profile";

const AddListing = ({ setAuth }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    document.title = "Add Listing | Metrohyve";

    const fetchData = async () => {
      try {
        await axios.get(PROFILE_URL, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        if (error.response.data === "jwt expired") {
          setAuth(false);

          console.log("Session expired!");
        }
      }
    };
    fetchData();
  }, [setAuth]);

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
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // If the response status is 200 and status text is ok this will run reset input
      if (response.status === 200 && response.statusText === "OK") {
        // Clear input field after submit
        e.target.reset();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section>
      <div className="container-fluid d-grid align-items-center justify-content-center py-5 vh-100">
        <div className="p-4 bg-light bg-gradient rounded shadow">
          <div className="text-center text-secondary shadow-sm rounded py-2">
            <h3>Add Listing</h3>
          </div>
          <form onSubmit={onSubmitForm} encType="multipart/form-data">
            <div className="form-outline">
              <label className="form-label" htmlFor="description"></label>
              <textarea
                className="form-control"
                placeholder="Description"
                id="description"
                type="text"
                name="description"
                rows="3"
                cols="30 "
                required
                autoFocus
                onChange={(e) => {
                  const { value } = e.target;
                  setDescription(value);
                }}
              ></textarea>
            </div>
            <div className="form-outline">
              <label className="form-label" htmlFor="location"></label>
              <input
                className="form-control"
                placeholder="Location"
                type="text"
                name="location"
                id="location"
                onChange={(e) => {
                  const { value } = e.target;
                  setLocation(value);
                }}
                required
              />
            </div>
            <div className="form-outline">
              <label className="form-label" htmlFor="price"></label>
              <input
                className="form-control"
                placeholder="Price"
                type="number"
                name="price"
                id="price"
                onChange={(e) => {
                  const { value } = e.target;
                  setPrice(value);
                }}
                required
              />
            </div>
            <div className="form-outline mb-4 pt-3">
              <label className="form-label text-secondary" htmlFor="file">
                Add Image: (3 images required)
              </label>
              <input
                className="form-control"
                type="file"
                name="file"
                id="file"
                accept="image/*"
                multiple
                min="3"
                max="3"
                required
                onChange={(e) => {
                  const file = e.target.files;
                  // console.log(file);
                  setFiles(file);
                }}
              />
            </div>
            <div className="d-grid">
              <button
                className="btn btn-warning px-4 py-2 bg-gradient shadow-sm rounded"
                type="button submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddListing;
