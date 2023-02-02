import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import BookingClass from "../booking/bookingClass";
import { useParams } from "react-router-dom";

const BOOKED_LISTING_API_URL = "/api/v1/booking";

const BookedListingTable = () => {
  const [bookedListing, setBookedListing] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BOOKED_LISTING_API_URL}/${id}`, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
          },
        });

        const parseRes = await response.data.booking;

        const itemBookedListing = parseRes.map((item) => {
          return new BookingClass({
            bookingId: item.booking_id,
            dateBooked: item.date_booked,
            fname: item.fname,
            lname: item.lname,
            email: item.email,
            startDate: item.start_date,
            endDate: item.end_date,
          });
        });

        setBookedListing(itemBookedListing);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const convertToMDY = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  return (
    <section>
      <div className="p-2 shadow">
        <div className="table-responsive-md">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th scope="col">Date Reserved</th>
                <th scope="col">Client Name</th>
                <th scope="col">Client Email</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
              </tr>
            </thead>
            <tbody>
              {bookedListing.length !== 0 &&
                bookedListing[0].bookingId !== null &&
                bookedListing.map((item) => {
                  return (
                    <tr key={item.bookedId}>
                      <td>{convertToMDY(`${item.dateBooked}`)}</td>
                      <td>
                        {item.fname} {item.lname}
                      </td>
                      <td>{item.email}</td>
                      <td>{convertToMDY(`${item.startDate}`)}</td>
                      <td>{convertToMDY(`${item.endDate}`)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BookedListingTable;
