import Booking from '../models/Booking.js';

export async function createBooking(req, res) {
  const { serviceCategory, date, time, price, expert, notes } = req.body;
  const booking = await Booking.create({
    customer: req.user.id,
    expert,
    serviceCategory,
    date,
    time,
    price: price || 0,
    notes
  });
  res.json(booking);
}

export async function getCustomerBookings(req, res) {
  const bookings = await Booking.find({ customer: req.user.id }).populate('expert', 'name email');
  res.json(bookings);
}

export async function getBooking(req, res) {
  const booking = await Booking.findById(req.params.id).populate('expert', 'name email').populate('customer', 'name email');
  res.json(booking);
}

export async function getExpertBookings(req, res) {
  const bookings = await Booking.find({ expert: req.user.id }).populate('customer', 'name email');
  res.json(bookings);
}

