import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ListingClass from "../listing/ListingClass";
import imageUrl from "../component/ImagePath";
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
            listing_id: item.listing_id,
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

  const handleListingSelect = (listing_id) => {
    navigate(`/listing/${listing_id}`);
  };

  return (
    <section>
      <div className="container justify-content-center align-items-center vh-100">
        <ul className="row row-cols-1 row-cols-md-4 g-4 list-unstyled">
          {allListing.length !== 0 &&
            allListing[0].listing_id !== null &&
            allListing.map((item, index) => {
              return (
                <li className="col" key={index}>
                  <div className="card h-100 shadow-sm">
                    <figure className="figure">
                      <div
                        id={`carouselImage-${item.listing_id}`}
                        className="carousel slide"
                        data-bs-ride="false"
                      >
                        <div className="carousel-indicators">
                          <button
                            type="button"
                            data-bs-target={`#carouselImage-${item.listing_id}`}
                            data-bs-slide-to="0"
                            className="active"
                          ></button>
                          <button
                            type="button"
                            data-bs-target={`#carouselImage-${item.listing_id}`}
                            data-bs-slide-to="1"
                          ></button>
                          <button
                            type="button"
                            data-bs-target={`#carouselImage-${item.listing_id}`}
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
                            data-bs-target={`#carouselImage-${item.listing_id}`}
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
                            data-bs-target={`#carouselImage-${item.listing_id}`}
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
                      type="button"
                      className="card-body"
                      onClick={() => {
                        handleListingSelect(item.listing_id);
                      }}
                    >
                      <div>
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
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default AllListing;
