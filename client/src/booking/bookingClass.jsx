class BookingClass {
  constructor({
    bookingId,
    dateBooked,
    startDate,
    endDate,
    description,
    location,
    price,
  }) {
    this.bookingId = bookingId;
    this.dateBooked = dateBooked;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.location = location;
    this.price = price;
  }
}

export default BookingClass;
