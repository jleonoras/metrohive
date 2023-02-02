class BookingClass {
  constructor({
    bookingId,
    dateBooked,
    startDate,
    endDate,
    description,
    location,
    price,
    listingId,
    userId,
    fname,
    lname,
    email,
  }) {
    this.bookingId = bookingId;
    this.dateBooked = dateBooked;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.location = location;
    this.price = price;
    this.listingId = listingId;
    this.userId = userId;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
  }
}

export default BookingClass;
