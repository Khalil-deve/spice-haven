import express from "express";
import Review from "../models/Review";

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews
// @access  Public
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Server Error" });
  }
});

// @route   POST /api/reviews
// @desc    Create a review
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, rating, text } = req.body;

    if (!name || !rating || !text) {
      res.status(400).json({ error: "Name, rating, and text are required for a review." });
      return;
    }

    const review = new Review({
      name,
      rating: Number(rating),
      text,
      date: "Just now",
      isCustom: true,
    });

    const createdReview = await review.save();
    res.status(201).json({ success: true, review: createdReview });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Server Error" });
  }
});

export default router;
