import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import ListingClass from "../listing/ListingClass";
import imageUrl from "../constants/constants";
import BookedListingTable from "./BookedListingTable";
import ConfirmedBookingTable from "./ConfirmedBookingTable";
import DeclinedBookingTable from "./DeclinedBookingTable";
import BookingClass from "../booking/bookingClass";

const SINGLE_LISTING_API_URL = "/api/v1/listing";
const DECLINED_BOOKINGS_API_URL = "/api/v1/declined";
const CONFIRMED_BOOKINGS_API_URL = "/api/v1/confirmed";
const BOOKED_LISTING_API_URL = "/api/v1/booking";

const CONFIRM_BOOKING_API_URL = "/api/v1/confirm";
const DECLINE_BOOKING_API_URL = "/api/v1/decline";

const BookedListing = ({ setAuth }) => {
  const [listing, setListing] = useState([]);
  const [confirmedBooking, setConfirmedBooking] = useState([]);
  const [bookedListing, setBookedListing] = useState([]);
  const [declinedBooking, setDeclinedBooking] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    document.title = "Bookings | Metrohyve";

    const fetchDeclinedBookings = async () => {
      try {
        const response = await axios.get(`${DECLINED_BOOKINGS_API_URL}/${id}`, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const parseRes = response.data.booking;

        const itemBookedListing = parseRes.map((item) => {
          return new BookingClass({
            bookingId: item.booking_id,
            dateBooked: item.date_booked,
            fname: item.fname,
            lname: item.lname,
            email: item.email,
            startDate: item.start_date,
            endDate: item.end_date,
            status: item.status,
          });
        });
        setDeclinedBooking(itemBookedListing);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchConfirmedBookings = async () => {
      try {
        const response = await axios.get(
          `${CONFIRMED_BOOKINGS_API_URL}/${id}`,
          {
            withCredentials: true,
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const parseRes = response.data.booking;

        const itemConfirmedBooking = parseRes.map((item) => {
          return new BookingClass({
            bookingId: item.booking_id,
            dateBooked: item.date_booked,
            fname: item.fname,
            lname: item.lname,
            email: item.email,
            startDate: item.start_date,
            endDate: item.end_date,
            status: item.status,
          });
        });

        setConfirmedBooking(itemConfirmedBooking);
      } catch (error) {
        if (
          error.response.data === "jwt expired" ||
          error.message === "Request failed with status code 403"
        ) {
          console.log(error.message);
        }
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${BOOKED_LISTING_API_URL}/${id}`, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const parseRes = response.data.booking;

        const itemBookedListing = parseRes.map((item) => {
          return new BookingClass({
            bookingId: item.booking_id,
            dateBooked: item.date_booked,
            fname: item.fname,
            lname: item.lname,
            email: item.email,
            startDate: item.start_date,
            endDate: item.end_date,
            status: item.status,
          });
        });

        setBookedListing(itemBookedListing);
      } catch (error) {
        if (
          error.response.data === "jwt expired" ||
          error.message === "Request failed with status code 403"
        ) {
          console.log(error.message);
        }
      }
    };

    const fetchListingData = async () => {
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
        if (error.response.data === "jwt expired") {
          setAuth(false);

          console.log("Session expired!");
        }
      }
    };

    fetchListingData();
    fetchConfirmedBookings();
    fetchDeclinedBookings();
    fetchBookings();
  }, [id, setAuth]);

  const handleConfirm = async (bookingId, startDate, endDate) => {
    try {
      const data = {
        bookingId,
        startDate,
        endDate,
      };

      await axios.put(`${CONFIRM_BOOKING_API_URL}/${bookingId}`, data, {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const selectedBooking = bookedListing.find(
        (booking) => booking.bookingId === bookingId
      );
      // console.log(bookedListing, bookingId, selectedBooking);

      setBookedListing(
        bookedListing.filter((booking) => {
          return booking.bookingId !== bookingId;
        })
      );

      confirmedBooking.unshift(selectedBooking);
      setConfirmedBooking(confirmedBooking);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (bookingId, startDate, endDate) => {
    try {
      const data = {
        bookingId,
        startDate,
        endDate,
      };

      await axios.put(`${DECLINE_BOOKING_API_URL}/${bookingId}`, data, {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const selectedBooking = bookedListing.find(
        (booking) => booking.bookingId === bookingId
      );

      setBookedListing(
        bookedListing.filter((booking) => {
          return booking.bookingId !== bookingId;
        })
      );

      declinedBooking.unshift(selectedBooking);
      setDeclinedBooking(declinedBooking);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="container">
        <div className="pt-5">
          <div className="pb-2 shadow rounded bg-light bg-gradient">
            <ul className="list-unstyled">
              {listing.length !== 0 &&
                listing.listingId !== null &&
                listing.map((item) => {
                  return (
                    <li key={item.listingId}>
                      <div className="px-2">
                        <div>
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
                              <div>
                                <hr />
                              </div>
                              <div>
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
                                    <span>
                                      <i className="fa-solid fa-location-dot"></i>
                                    </span>
                                    <span>
                                      <strong> {item.location}</strong>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </figure>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="container p-2 my-4 rounded bg-gradient bg-light shadow">
          <div className="text-center py-3 my-1 mb-3 rounded shadow-sm bg-gradient bg-light fs-5">
            <strong>Bookings</strong>
          </div>
          <div>
            <hr />
          </div>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pending-tab"
                data-bs-toggle="tab"
                data-bs-target="#pending-tab-pane"
                type="button"
                role="tab"
                aria-controls="pending-tab-pane"
                aria-selected="true"
              >
                Pending
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="confirmed-tab"
                data-bs-toggle="tab"
                data-bs-target="#confirmed-tab-pane"
                type="button"
                role="tab"
                aria-controls="confirmed-tab-pane"
                aria-selected="true"
              >
                Confirmed
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="declined-tab"
                data-bs-toggle="tab"
                data-bs-target="#declined-tab-pane"
                type="button"
                role="tab"
                aria-controls="declined-tab-pane"
                aria-selected="true"
              >
                Declined
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="pending-tab-pane"
              role="tabpanel"
              aria-labelledby="pending-tab"
              tabIndex="0"
            >
              <BookedListingTable
                bookedListing={bookedListing}
                handleConfirm={handleConfirm}
                handleDecline={handleDecline}
              />
            </div>
            <div
              className="tab-pane fade"
              id="confirmed-tab-pane"
              role="tabpanel"
              aria-labelledby="confirmed-tab"
              tabIndex="1"
            >
              <ConfirmedBookingTable confirmedBooking={confirmedBooking} />
            </div>
            <div
              className="tab-pane fade"
              id="declined-tab-pane"
              role="tabpanel"
              aria-labelledby="declined-tab"
              tabIndex="2"
            >
              <DeclinedBookingTable declinedBookings={declinedBooking} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookedListing;
