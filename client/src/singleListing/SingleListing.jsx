import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import imageUrl from "../component/ImagePath";
import ListingClass from "../listing/ListingClass";

const SINGLE_LISTING_API_URL = "/api/v1/listing";

const SingleListing = () => {
  const [listing, setListing] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getSingleListing = async () => {
      try {
        const response = await axios.get(`${SINGLE_LISTING_API_URL}/${id}`);

        const parseRes = await response.data;
        // console.log(parseRes);
        // console.log(response);

        const listing = parseRes.map((item) => {
          return new ListingClass({
            listing_id: item.listing_id,
            description: item.description,
            location: item.location,
            price: item.price,
            image1: `${imageUrl}/${item.image1}`,
            image2: `${imageUrl}/${item.image2}`,
            image3: `${imageUrl}/${item.image3}`,
            fname: item.fname,
            lname: item.lname,
            email: item.email,
          });
        });

        setListing(listing);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleListing();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="App">
      <div className="App-header">
        <div>
          <h3>This is the Single Listing Page.</h3>
        </div>
        <div>
          <ul>
            {listing.length !== 0 &&
              listing.listing_id !== null &&
              listing.map((item) => {
                return (
                  <li key={item.listing_id}>
                    <figure>
                      <img
                        src={item.image1}
                        alt={item.description}
                        loading="lazy"
                      ></img>
                      <img
                        src={item.image2}
                        alt={item.description}
                        loading="lazy"
                      ></img>
                      <img
                        src={item.image3}
                        alt={item.description}
                        loading="lazy"
                      ></img>
                    </figure>
                    <div>
                      <h3>Price:</h3>
                      <p>₱{item.price}</p>
                    </div>
                    <div>
                      <h3>Description:</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <h3>Location:</h3>
                      <p>{item.location}</p>
                    </div>
                    <div>
                      <h3>Owner:</h3>
                      <p>
                        {item.fname} {item.lname}
                      </p>
                    </div>
                    <div>
                      <h3>Email:</h3>
                      <p>{item.email}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SingleListing;
