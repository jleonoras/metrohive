import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import imageUrl from "../component/ImagePath";
import Search from "../component/Search";
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
      <div className="container justify-content-center align-item-center py-2 px-4 vh-100">
        <div>
          <Search />
        </div>
        <ul className="list-unstyled">
          {listing.length !== 0 &&
            listing.listing_id !== null &&
            listing.map((item) => {
              return (
                <li key={item.listing_id}>
                  <div className="">
                    <div className="">
                      <figure>
                        <div className="row justify-content-center align-items-center shadow">
                          <div className="col-md ratio ratio-4x3 card">
                            <img
                              src={item.image1}
                              alt={item.description}
                              className="img-fluid"
                              loading="lazy"
                            ></img>
                          </div>
                          <div className="col-md ratio ratio-4x3 card">
                            <img
                              src={item.image2}
                              alt={item.description}
                              className="img-fluid"
                              loading="lazy"
                            ></img>
                          </div>

                          <div className="col-md ratio ratio-4x3 card">
                            <img
                              src={item.image3}
                              alt={item.description}
                              className="img-fluid"
                              loading="lazy"
                            ></img>
                          </div>
                        </div>
                      </figure>
                    </div>
                    <div className="row py-4">
                      <div className="col-md">
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
                      </div>
                      <div className="col-sm">
                        <div className="container">
                          <div className="row">
                            <div className="col-sm">
                              <h6>Meet the owner:</h6>
                            </div>
                            <div className="col-sm-5">
                              <div className="row">
                                <address>
                                  <span className="col">
                                    {item.fname} {item.lname}
                                  </span>
                                  <p className="col">{item.email}</p>
                                </address>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="row">
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
                              </div>
                            </div>
                          </div>
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
