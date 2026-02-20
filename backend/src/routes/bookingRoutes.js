import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE
router.post("/", protect, async (req, res) => {
  const booking = await Booking.create({
    userId: req.user.id,
    service: req.body.service,
    date: req.body.date,
    timeSlot: req.body.timeSlot,
    price: req.body.price
  });
  res.status(201).json(booking);
});

// READ
router.get("/my", protect, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id });
  res.json(bookings);
});

// UPDATE
router.put("/:id", protect, async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", protect, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ msg: "Booking deleted" });
});

export default router;
