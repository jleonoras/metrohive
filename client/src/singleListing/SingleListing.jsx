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
    document.title = "Listing | Metrohyve";

    const getSingleListing = async () => {
      try {
        const response = await axios.get(`${SINGLE_LISTING_API_URL}/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

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
  }, [id]);

  return (
    <section>
      <div className="container p-5">
        <ul className="list-unstyled">
          {listing.length !== 0 &&
            listing.listing_id !== null &&
            listing.map((item) => {
              return (
                <li key={item.listing_id}>
                  <div className="row mx-auto my-auto justify-content-center">
                    <div
                      id="recipeCarousel"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                          <div className="col-md-3">
                            <div className="card">
                              <div className="card-img">
                                <img
                                  src={item.image1}
                                  alt={item.description}
                                  className="img-fluid"
                                  loading="lazy"
                                ></img>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="col-md-3">
                            <div className="card">
                              <div className="card-img">
                                <img
                                  src={item.image2}
                                  alt={item.description}
                                  className="img-fluid"
                                  loading="lazy"
                                ></img>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="col-md-3">
                            <div className="card">
                              <div className="card-img">
                                <img
                                  src={item.image3}
                                  alt={item.description}
                                  className="img-fluid"
                                  loading="lazy"
                                ></img>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a
                        className="carousel-control-prev bg-transparent w-aut"
                        href="#recipeCarousel"
                        role="button"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                      </a>
                      <a
                        className="carousel-control-next bg-transparent w-aut"
                        href="#recipeCarousel"
                        role="button"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                      </a>
                    </div>
                    <div className="col">
                      <div className="h-100">
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
                          <strong>
                            <p>{item.location}</p>
                          </strong>
                        </div>
                        <div>
                          <h6>Owner:</h6>
                          <p>
                            {item.fname} {item.lname}
                          </p>
                          <address>
                            <p>{item.email}</p>
                            <button
                              type="button"
                              className="btn btn-warning bg-gradient"
                            >
                              <a
                                className="text-decoration-none text-body"
                                href={`mailto:${
                                  item.email
                                }?subject=Inquire ${new Intl.NumberFormat(
                                  "en-PH",
                                  {
                                    currency: "PHP",
                                    style: "currency",
                                  }
                                ).format(`${item.price}`)} - ${
                                  item.description
                                }`}
                              >
                                <strong>Inquire Now</strong>
                              </a>
                            </button>
                          </address>
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

export default SingleListing;
