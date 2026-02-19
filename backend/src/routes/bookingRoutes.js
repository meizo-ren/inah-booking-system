import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE A BOOKING //
router.post("/", protect, async (req, res) => {
  try {
    const { service, date, timeSlot } = req.body;

    const booking = await Booking.create({
      userId: req.user.id,
      service,
      date,
      timeSlot
    });

    res.status(201).json({ msg: "Booking created", booking });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// GET BOOKINGS FOR LOGGED IN USER //
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

export default router;
