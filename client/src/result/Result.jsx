import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import imageUrl from "../component/ImagePath";
import ListingClass from "../listing/ListingClass";

const SEARCH_LISTING_URL = "/api/v1/location/?location=";

const Result = () => {
  const { location } = useParams();
  const navigate = useNavigate();

  const [searchListing, setSearchListing] = useState([]);

  useEffect(() => {
    document.title = "Search Listing | Metrohyve";

    const fetchData = async () => {
      try {
        const response = await axios.get(`${SEARCH_LISTING_URL}${location}`);
        const parseRes = await response?.data?.listing;

        const searchListing = parseRes.map((item) => {
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

        setSearchListing(searchListing);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [location]);

  const handleListingSelect = (listing_id) => {
    navigate(`/listing/${listing_id}`);
  };

  const toTitleCase = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  return (
    <section className="App">
      <div className="App-header">
        <div>
          <h3>Search Result for "{toTitleCase(location)}"</h3>
        </div>
        <div>
          <ul>
            {searchListing.length !== 0 && searchListing.listing_id !== null ? (
              searchListing.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      handleListingSelect(item.listing_id);
                    }}
                  >
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
                    <div>Description:</div>
                    <p>{item.description}</p>
                    <div>
                      <h3>Location:</h3>
                      <p>{item.location}</p>
                    </div>
                  </li>
                );
              })
            ) : (
              <div>
                <h3>No Result</h3>
              </div>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Result;
