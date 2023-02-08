import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import BookingClass from "../booking/bookingClass";

const USER_BOOKING_API_URL = "/api/v1/user/booking";

const UserBooking = () => {
  const [userBooking, setUserBooking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(USER_BOOKING_API_URL, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const parseRes = response.data.booking;

        const itemBooking = parseRes.map((item) => {
          return new BookingClass({
            bookingId: item.booking_id,
            dateBooked: item.date_booked,
            startDate: item.start_date,
            endDate: item.end_date,
            description: item.description,
            location: item.location,
            price: item.price,
            status: item.status,
          });
        });

        setUserBooking(itemBooking);
      } catch (error) {
        if (
          error.response.data === "jwt expired" &&
          error.message === "Request failed with status code 403"
        ) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, [userBooking]);

  const convertToMDY = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
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

  return (
    <div className="p-2 shadow rounded bg-gradient bg-light">
      <div className="table-responsive-md">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th scope="col" className="text-center">
                Date Reserved
              </th>
              <th scope="col" className="text-center">
                Description
              </th>
              <th scope="col" className="text-center">
                Location
              </th>
              <th scope="col" className="text-center">
                Price
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
            {userBooking.length !== 0 &&
              userBooking[0].bookingId !== null &&
              userBooking.map((item) => {
                return (
                  <tr key={item.bookingId}>
                    <td className="text-center">
                      {convertToMDY(`${item.dateBooked}`)}
                    </td>
                    <td className="text-center">{item.description}</td>
                    <td className="text-center">{item.location}</td>
                    <td className="text-center">
                      {new Intl.NumberFormat("en-PH", {
                        currency: "PHP",
                        style: "currency",
                      }).format(`${item.price}`)}
                    </td>
                    <td className="text-center">
                      {convertToMDY(`${item.startDate}`)}
                    </td>
                    <td className="text-center">
                      {convertToMDY(`${item.endDate}`)}
                    </td>
                    <td className="text-center">{toTitleCase(item.status)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBooking;
