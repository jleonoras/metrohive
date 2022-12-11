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
    document.title = "Search Result | Metrohyve";

    const fetchData = async () => {
      try {
        const response = await axios.get(`${SEARCH_LISTING_URL}${location}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const parseRes = await response.data.listing;

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

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <section>
      <div className="container pt-5">
        <div>
          {searchListing.length !== 0 && searchListing.listing_id !== null ? (
            <h6>
              Search Result for "<strong>{toTitleCase(location)}</strong>"
            </h6>
          ) : (
            ""
          )}
        </div>
        <div>
          <ul className="list-unstyled">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {searchListing.length !== 0 &&
              searchListing.listing_id !== null ? (
                searchListing.map((item, index) => {
                  return (
                    <li className="col" key={index}>
                      <div className="card h-100">
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
                                <span className="visually-hidden">
                                  Previous
                                </span>
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
                            <p>{item.description}</p>
                            <div>
                              <strong>{item.location}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className="container">
                  <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                    <div>
                      <span>
                        No Result for "<strong>{toTitleCase(location)}</strong>"
                      </span>
                    </div>
                    <div className="py-3" onClick={handleBackToHome}>
                      <button
                        className="btn btn-warning bg-gradient"
                        type="button"
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Result;
