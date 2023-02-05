import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import imageUrl from "../constants/constants";
import Search from "../component/Search";
import ListingClass from "../listing/ListingClass";
import SelectDate from "../datePicker/DatePicker";

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

        const parseRes = response.data;

        const listing = parseRes.map((item) => {
          return new ListingClass({
            listingId: item.listing_id,
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
      <div className="container">
        <div>
          <Search />
        </div>
        <div className="pt-5">
          <ul className="list-unstyled">
            {listing.length !== 0 &&
              listing.listingId !== null &&
              listing.map((item) => {
                return (
                  <li key={item.listingId}>
                    <div className="px-2">
                      <div className="shadow rounded bg-gradient bg-light">
                        <figure>
                          <div className="row row-cols-1 g-1">
                            <div className="col-md w-100 ratio ratio-4x3 card overflow-hidden">
                              <img
                                src={item.image1}
                                alt={item.description}
                                className="img-fluid"
                                loading="lazy"
                              ></img>
                            </div>
                            <div className="col-md w-100 ratio ratio-4x3 card overflow-hidden">
                              <img
                                src={item.image2}
                                alt={item.description}
                                className="img-fluid"
                                loading="lazy"
                              ></img>
                            </div>
                            <div className="col-md ratio w-100 ratio-4x3 card overflow-hidden">
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
                      <div>
                        <hr />
                      </div>
                      <div className="row py-3 shadow rounded bg-gradient bg-light">
                        <div className="col">
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
                          <div className="col-md">
                            <div>
                              <h6>Meet the owner:</h6>
                            </div>
                            <div>
                              <address>
                                <span>
                                  {item.fname} {item.lname}
                                </span>
                                <p>{item.email}</p>
                              </address>
                            </div>
                            <div className="my-3">
                              <button
                                type="button"
                                className="btn btn-warning btn-sm bg-gradient"
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
                        <div className="col-md">
                          <div className="row">
                            <div>
                              <strong>
                                <h6>Reservation:</h6>
                              </strong>
                            </div>
                            <div className="text-center">
                              <div className="py-2">
                                <strong>Pick a date</strong>
                              </div>
                              <SelectDate listingId={item.listingId} />
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
      </div>
    </section>
  );
};

export default SingleListing;
