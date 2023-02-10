import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "../api/axios";

const BOOKING_URL = "/api/v1/booking";

const SelectDate = ({ listingId }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const data = {
        start_date: startDate,
        end_date: endDate,
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
        window.location.reload();
      }
      // <Navigate to="/dashboard" />;
      // const parseRes = response.data;
      // console.log(parseRes);
    } catch (error) {
      console.log(error);
      if (
        error.response.data.message === "Authorization denied!" &&
        error.response.status === 403 &&
        error.response.statusText === "Forbidden"
      ) {
        alert("Please login...");
      }
    }
  };

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
                >
                  Start date:
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
              <div className="py-1">
                <label className="form-label text-secondary" htmlFor="endDate">
                  End date:
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
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
