import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import BookingClass from "../booking/bookingClass";

const CONFIRMED_BOOKINGS_API_URL = "/api/v1/confirmed";

const ConfirmedBookingTable = ({ listingId }) => {
  const [confirmedBooking, setConfirmedBooking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${CONFIRMED_BOOKINGS_API_URL}/${listingId}`,
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
    fetchData();
  }, [listingId]);

  const convertToMDY = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
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
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {confirmedBooking.length !== 0 &&
              confirmedBooking[0].bookingId !== null &&
              confirmedBooking.map((item) => {
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
                    <td className="text-center">{item.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmedBookingTable;
