import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MyListing from "./MyListing";

const USER_LISTING_URL = "/api/v1/user/listing";

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
        },
      });
      // console.log(response);
      const parseRes = await response?.data;

      const itemListing = parseRes.map((item) => {
        return new MyListing({
          listing_id: item.listing_id,
          description: item.description,
          location: item.location,
          price: item.price,
          image1: item.image1,
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
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default UserListing;
