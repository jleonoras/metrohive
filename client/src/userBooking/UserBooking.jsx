import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../api/axios";
import BookingClass from "../booking/bookingClass";

const USER_LISTING_API_URL = "/api/v1/user/booking";

const UserBooking = () => {
  const [userBooking, setUserBooking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(USER_LISTING_API_URL, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
          },
        });

        const parseRes = await response.data.booking;

        const itemBooking = parseRes.map((item) => {
          return new BookingClass({
            bookingId: item.booking_id,
            dateBooked: item.date_booked,
            startDate: item.start_date,
            endDate: item.end_date,
            description: item.description,
            location: item.location,
            price: item.price,
          });
        });

        setUserBooking(itemBooking);
      } catch (error) {
        console.log(error);
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

  return (
    <div className="py-2">
      <div className="table-responsive-md">
        <table className="table table-striped table-hover">
          <thead className="table-dark bg-gradient">
            <tr>
              <th scope="col">Date Booked</th>
              <th scope="col">Description</th>
              <th scope="col">Location</th>
              <th scope="col">Price</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
            </tr>
          </thead>
          <tbody>
            {userBooking.length !== 0 &&
              userBooking[0].bookingId !== null &&
              userBooking.map((item) => {
                return (
                  <tr key={item.bookingId}>
                    <td>{convertToMDY(`${item.dateBooked}`)}</td>
                    <td>{item.description}</td>
                    <td>{item.location}</td>
                    <td>
                      {new Intl.NumberFormat("en-PH", {
                        currency: "PHP",
                        style: "currency",
                      }).format(`${item.price}`)}
                    </td>
                    <td>{convertToMDY(`${item.startDate}`)}</td>
                    <td>{convertToMDY(`${item.endDate}`)}</td>
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
