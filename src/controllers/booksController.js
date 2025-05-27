// import Books from "../models/Books.js";
import generateToken from "../utils/generateToken.js";

import Book from "../models/Books.js";

export default {
  addBook: async (req, res) => {
    try {
      const { title, author, genre } = req.body;

      if (!title || !author) {
        return res
          .status(400)
          .json({ message: "Title and author are required" });
      }

      const book = new Book({ title, author, genre });
      await book.save();

      res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllBooks: async (req, res) => {
    try {
      let { page = 1, limit = 10, author, genre } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const filter = {};
      if (author) filter.author = new RegExp(author, "i");
      if (genre) filter.genre = new RegExp(genre, "i");

      const books = await Book.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Book.countDocuments(filter);

      res.json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        books,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addReview: async (req, res) => {
    try {
      const userId = req.user._id;
      const { id: bookId } = req.params;
      const { rating, comment } = req.body;

      if (!rating) {
        return res.status(400).json({ message: "Rating is required" });
      }

      const book = await Book.findById(bookId);
      if (!book) return res.status(404).json({ message: "Book not found" });

      const alreadyReviewed = book.reviews.find(
        (r) => r.user.toString() === userId.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: "Review already added.." });
      }

      const newReview = {
        user: userId,
        rating,
        comment,
      };

      book.reviews.push(newReview);
      await book.save();

      res.status(201).json({ message: "Review added", review: newReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateReview: async (req, res) => {
    try {
      const userId = req.user._id;
      const { id: reviewId } = req.params;
      const { rating, comment } = req.body;

      const book = await Book.findOne({ "reviews._id": reviewId });

      if (!book) {
        return res.status(404).json({ message: "review not found" });
      }

      const review = book.reviews.id(reviewId);

      if (!review.user.equals(userId)) {
        return res
          .status(403)
          .json({ message: "you are not authorised to update review" });
      }

      if (rating) review.rating = rating;
      if (comment) review.comment = comment;

      await book.save();

      res.json({ message: "Review updated", review });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const userId = req.user._id;
      const { id: reviewId } = req.params;

      const book = await Book.findOne({ "reviews._id": reviewId });

      if (!book) {
        return res.status(404).json({ message: "review not found" });
      }

      const review = book.reviews.id(reviewId);

      if (!review.user.equals(userId)) {
        return res
          .status(403)
          .json({ message: "you are not authorised to delete review" });
      }

      book.reviews.pull(reviewId);

      await book.save();

      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  bookSearch: async (req, res) => {
    try {
      const { query } = req.query;

      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }

      const regex = new RegExp(query, "i");

      const books = await Book.find({
        $or: [{ title: regex }, { author: regex }],
      });

      res.json({ total: books.length, books });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
