import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const USER_LISTING_URL = "/api/v1/user-listing";

const UserListing = () => {
  const [itemListing, setItemListing] = useState([]);
  const [listingTitle, setListingTitle] = useState("");
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
        class MyListing {
          constructor({ listing_id, description, location, price, image1 }) {
            this.listing_id = listing_id;
            this.description = description;
            this.location = location;
            this.price = price;
            this.image1 = image1;
          }
        }

        return new MyListing({
          listing_id: item.listing_id,
          description: item.description,
          location: item.location,
          price: item.price,
          image1: item.image1,
        });
      });

      setItemListing(itemListing);
      setListingTitle("My Listing");
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
    <>
      <section>
        <div>
          <h3>{listingTitle}</h3>
        </div>
        <div>
          <ul>
            {itemListing.map((item, index) => {
              return (
                <li key={index}>
                  <figure>
                    <img src={item.image1} alt="" loading="lazy"></img>
                  </figure>
                  <div>
                    <p>{itemPrice}</p>
                    {pesoSign}
                    {item.price}
                  </div>
                  <div>
                    <p>{itemDescription}</p>
                    {item.description}
                  </div>
                  <div>
                    <p>{itemLocation}</p>
                    {item.location}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserListing;
