import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ListingClass from "../listing/ListingClass";
import imageUrl from "../component/ImagePath";

const USER_LISTING_URL = "/api/v1/user/listing";
const DELETE_LISTING_API_URL = "/api/v1/listing";

const UserListing = () => {
  const [itemListing, setItemListing] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [pesoSign, setPesoSign] = useState("");
  const [itemLocation, setItemLocation] = useState("");

  const getUserListing = async () => {
    try {
      const response = await axios.get(USER_LISTING_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const parseRes = await response.data.listing;

      const itemListing = parseRes.map((item) => {
        return new ListingClass({
          listing_id: item.listing_id,
          description: item.description,
          location: item.location,
          price: item.price,
          image1: `${imageUrl}/${item.image1}`,
          image2: `${imageUrl}/${item.image2}`,
          image3: `${imageUrl}/${item.image3}`,
        });
      });

      setItemListing(itemListing);
      setItemDescription("Description:");
      setItemPrice("Price:");
      setPesoSign("₱");
      setItemLocation("Location:");
    } catch (error) {
      console.log(error);
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserListing();
  }, []);

  const deleteUserListing = async (id) => {
    try {
      const response = await axios.delete(`${DELETE_LISTING_API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response);

      setItemListing(
        itemListing.filter((listing) => listing.listing_id !== id)
      );
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <section>
      <div>
        <ul>
          {itemListing.length !== 0 &&
            itemListing[0].listing_id !== null &&
            itemListing.map((item) => {
              return (
                <li key={item.listing_id}>
                  <figure>
                    <img
                      src={item.image1}
                      alt={item.description}
                      loading="lazy"
                    ></img>
                  </figure>
                  <div>
                    <h3>{itemPrice}</h3>
                    <p>
                      {pesoSign}
                      {item.price}
                    </p>
                  </div>
                  <div>
                    <h3>{itemDescription}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <h3>{itemLocation}</h3>
                    <p>{item.location}</p>
                  </div>
                  <button onClick={() => deleteUserListing(item.listing_id)}>
                    Delete
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default UserListing;
