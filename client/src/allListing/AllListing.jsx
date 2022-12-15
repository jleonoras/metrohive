import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ListingClass from "../listing/ListingClass";
import imageUrl from "../constants/constants";
import { useNavigate } from "react-router-dom";

const ALL_LISTING_URL = "/api/v1/listing";

const AllListing = () => {
  const [allListing, setAllListing] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ALL_LISTING_URL, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const parseRes = await response.data.listing;

        const allListing = parseRes.map((item) => {
          return new ListingClass({
            listingId: item.listing_id,
            description: item.description,
            location: item.location,
            price: item.price,
            image1: `${imageUrl}/${item.image1}`,
            image2: `${imageUrl}/${item.image2}`,
            image3: `${imageUrl}/${item.image3}`,
          });
        });

        setAllListing(allListing);
      } catch (error) {
        console.log(error);
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleListingSelect = (listingId) => {
    navigate(`/listing/${listingId}`);
  };

  return (
    <section>
      <div className="pt-5">
        <ul className="list-unstyled">
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {allListing.length !== 0 &&
              allListing[0].listingId !== null &&
              allListing.map((item, index) => {
                return (
                  <li className="col" key={index}>
                    <div className="card h-100">
                      <figure className="figure">
                        <div
                          id={`carouselImage-${item.listingId}`}
                          className="carousel slide"
                          data-bs-ride="false"
                        >
                          <div className="carousel-indicators">
                            <button
                              type="button"
                              data-bs-target={`#carouselImage-${item.listingId}`}
                              data-bs-slide-to="0"
                              className="active"
                            ></button>
                            <button
                              type="button"
                              data-bs-target={`#carouselImage-${item.listingId}`}
                              data-bs-slide-to="1"
                            ></button>
                            <button
                              type="button"
                              data-bs-target={`#carouselImage-${item.listingId}`}
                              data-bs-slide-to="2"
                            ></button>
                          </div>
                          <div className="carousel-inner">
                            <div className="carousel-item active ratio ratio-4x3">
                              <img
                                src={item.image1}
                                alt={item.description}
                                loading="lazy"
                                className="card-img-top d-block w-100 img-fluid"
                              ></img>
                            </div>
                            <div className="carousel-item ratio ratio-4x3">
                              <img
                                src={item.image2}
                                alt={item.description}
                                loading="lazy"
                                className="card-img-top d-block w-100 img-fluid"
                              ></img>
                            </div>
                            <div className="carousel-item ratio ratio-4x3">
                              <img
                                src={item.image3}
                                alt={item.description}
                                loading="lazy"
                                className="card-img-top d-block w-100 img-fluid"
                              ></img>
                            </div>
                            {/* <!-- Controls --> */}
                            <button
                              className="carousel-control-prev"
                              type="button"
                              data-bs-target={`#carouselImage-${item.listingId}`}
                              data-bs-slide="prev"
                            >
                              <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                              className="carousel-control-next"
                              type="button"
                              data-bs-target={`#carouselImage-${item.listingId}`}
                              data-bs-slide="next"
                            >
                              <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Next</span>
                            </button>
                          </div>
                        </div>
                      </figure>
                      <div
                        className="card-body"
                        type="button"
                        onClick={() => {
                          handleListingSelect(item.listingId);
                        }}
                      >
                        <div>
                          <strong>
                            {new Intl.NumberFormat("en-PH", {
                              currency: "PHP",
                              style: "currency",
                            }).format(`${item.price}`)}
                          </strong>
                        </div>
                        <div>
                          <p>{item.description}</p>
                        </div>
                        <div>
                          <strong>{item.location}</strong>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </div>
        </ul>
      </div>
    </section>
  );
};

export default AllListing;
