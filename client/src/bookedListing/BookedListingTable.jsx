import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import BookingClass from "../booking/bookingClass";

const BOOKED_LISTING_API_URL = "/api/v1/booking";
const CONFIRM_BOOKING_API_URL = "/api/v1/confirm";
const DECLINE_BOOKING_API_URL = "/api/v1/decline";

const BookedListingTable = ({ listingId }) => {
  const [bookedListing, setBookedListing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BOOKED_LISTING_API_URL}/${listingId}`,
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
    fetchData();
  }, [listingId]);

  const convertToMDY = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

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

      setBookedListing(
        bookedListing.filter((booking) => {
          return booking.bookingId !== bookingId;
        })
      );
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

      setBookedListing(
        bookedListing.filter((booking) => {
          return booking.bookingId !== bookingId;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 shadow-sm rounded bg-gradient bg-light">
      <div className="table-responsive-md shadow-sm rounded">
        <table className="table table-striped table-hover shadow-sm rounded">
          <thead className="table-primary">
            <tr>
              <th scope="col" className="text-center">
                Date Reserved
              </th>
              <th scope="col" className="text-center">
                Client Name
              </th>
              <th scope="col" className="text-center">
                Client Email
              </th>
              <th scope="col" className="text-center">
                Check-in
              </th>
              <th scope="col" className="text-center">
                Check-out
              </th>
              <th scope="col" className="text-center">
                <i className="fa-solid fa-circle-check"></i>
              </th>
              <th scope="col" className="text-center">
                <i className="fa-solid fa-circle-xmark"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {bookedListing.length !== 0 &&
              bookedListing[0].bookingId !== null &&
              bookedListing.map((item) => {
                return (
                  <tr key={item.bookingId}>
                    <td className="text-center">
                      {convertToMDY(`${item.dateBooked}`)}
                    </td>
                    <td className="text-center">
                      {item.fname} {item.lname}
                    </td>
                    <td className="text-center">{item.email}</td>
                    <td className="text-center">
                      {convertToMDY(`${item.startDate}`)}
                    </td>
                    <td className="text-center">
                      {convertToMDY(`${item.endDate}`)}
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        id="confirm"
                        className="btn btn-sm btn-warning bg-gradient shadow-sm"
                        onClick={() => {
                          handleConfirm(
                            item.bookingId,
                            item.startDate,
                            item.endDate
                          );
                        }}
                      >
                        Confirm
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        id="decline"
                        className="btn btn-sm btn-danger bg-gradient shadow-sm"
                        onClick={() => {
                          handleDecline(
                            item.bookingId,
                            item.startDate,
                            item.endDate
                          );
                        }}
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookedListingTable;
