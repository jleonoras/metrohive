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
      <div className="container d-flex justify-content-center align-items-center p-5">
        <ul className="list-unstyled">
          {listing.length !== 0 &&
            listing.listing_id !== null &&
            listing.map((item) => {
              return (
                <li key={item.listing_id}>
                  <div className="row justify-content-center align-items-center">
                    <div className="col-md-4">
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
                            <div className="carousel-item active">
                              <img
                                src={item.image1}
                                alt={item.description}
                                loading="lazy"
                                className="d-block img-fluid"
                              ></img>
                            </div>
                            <div className="carousel-item ">
                              <img
                                src={item.image2}
                                alt={item.description}
                                loading="lazy"
                                className="d-block img-fluid"
                              ></img>
                            </div>
                            <div className="carousel-item">
                              <img
                                src={item.image3}
                                alt={item.description}
                                loading="lazy"
                                className="d-block img-fluid"
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
                    </div>
                    <div className="col-md-4">
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
