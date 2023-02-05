import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "../api/axios";
import BookingClass from "../booking/bookingClass";

const BOOKING_URL = "/api/v1/booking";
const DATE_BOOKED_LISTING_API_URL = "/api/v1/date";

const SelectDate = ({ listingId }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [excludeDates, setExcludeDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${DATE_BOOKED_LISTING_API_URL}/${listingId}`,
          {
            withCredentials: true,
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const parseRes = response.data.date;

        const itemDateBookedListing = parseRes.map((item) => {
          return new BookingClass({
            startDate: item.start_date,
            endDate: item.end_date,
          });
        });

        setExcludeDates(itemDateBookedListing);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [listingId]);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const data = {
        start_date: startDate.toLocaleDateString(),
        end_date: endDate.toLocaleDateString(),
        listing_id: listingId,
      };

      const response = await axios.post(BOOKING_URL, data, {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.statusText === "OK") {
        // Clear input field after submit
        alert("Booked successfully!");
        setStartDate("");
        setEndDate("");
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
      if (error.response.data.message === "Authorization denied!") {
        alert("Please login...");
      }
    }
  };

  const disabledDateRanges = excludeDates.map((range) => ({
    start: new Date(range.startDate),
    end: new Date(range.endDate),
  }));

  return (
    <div>
      <div className="row">
        <div className="col-md">
          <form onSubmit={onSubmitForm}>
            <div className="py-2">
              <div className="py-1">
                <label
                  className="form-label text-secondary"
                  htmlFor="startDate"
                ></label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  placeholderText="Check-in"
                  excludeDateIntervals={disabledDateRanges}
                  isClearable
                  required
                />
              </div>
              <div className="py-1">
                <label
                  className="form-label text-secondary"
                  htmlFor="endDate"
                ></label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Check-out"
                  excludeDateIntervals={disabledDateRanges}
                  isClearable
                  required
                />
              </div>
            </div>
            <div className="d-block py-2">
              <button
                type="button submit"
                className="btn btn-warning btn-sm btn-block bg-gradient"
              >
                <strong>Reserve Now</strong>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectDate;
