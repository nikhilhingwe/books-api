import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRouter.js";
import bookRoutes from "./routes/booksRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";

// dotenv
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "HEAD"],
    origin: "*",
    credentials: true,
  })
);

// routes for books-store
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);

// Database--Connection
connectDB();

// Port config
const PORT = process.env.PORT || 4000;

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
