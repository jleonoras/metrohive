const BookedListingTable = ({
  bookedListing,
  handleConfirm,
  handleDecline,
}) => {
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
