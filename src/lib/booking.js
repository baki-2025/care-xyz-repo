export const saveBooking = (booking) => {
  const data = JSON.parse(localStorage.getItem("bookings")) || [];
  data.push(booking);
  localStorage.setItem("bookings", JSON.stringify(data));
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem("bookings")) || [];
};