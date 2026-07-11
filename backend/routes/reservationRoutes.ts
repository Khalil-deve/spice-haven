import express from "express";
import Reservation from "../models/Reservation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/reservations
// @desc    Get logged in user's reservations
// @access  Private
router.get("/", protect, async (req: any, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Server Error" });
  }
});

// @route   POST /api/reservations
// @desc    Create a new reservation
// @access  Private
router.post("/", protect, async (req: any, res) => {
  try {
    const { name, email, phone, date, time, guests, location, specialRequests } = req.body;

    if (!name || !email || !phone || !date || !time || !guests || !location) {
      res.status(400).json({ error: "All required reservation fields must be provided." });
      return;
    }

    const reservation = new Reservation({
      user: req.user._id,
      name,
      email,
      phone,
      date,
      time,
      guests,
      location,
      specialRequests,
    });

    const createdReservation = await reservation.save();
    res.status(201).json({ success: true, reservation: createdReservation });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Server Error" });
  }
});

export default router;
