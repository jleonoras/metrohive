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

      console.log(data);

      const response = await axios.post(BOOKING_URL, JSON.stringify(data), {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
      });

      const parseRes = response.data;
      console.log(parseRes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row p-2">
      <div>
        <div className="col-md">
          <form onSubmit={onSubmitForm}>
            <label htmlFor="startDate"></label>

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <input
              type="text"
              value={startDate}
              name="startDate"
              id="startDate"
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              required
            ></input>

            <label htmlFor="endDate"></label>

            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />

            <input
              type="text"
              value={endDate}
              name="endDate"
              id="endDate"
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              required
            ></input>

            <div className="d-grid">
              <button
                type="button submit"
                className="btn btn-warning btn-block mb-4 px-4 bg-gradient"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectDate;
