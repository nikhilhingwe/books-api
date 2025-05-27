import { Router } from "express";
import booksController from "../controllers/booksController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = Router();

// authentication-middleware
router.use(authenticate);

router.route("/add").post(booksController.addBook);
router.route("/get").get(booksController.getAllBooks);
router.route("/add-review/:id").post(booksController.addReview);
router.route("/update-review/:id").put(booksController.updateReview);
router.route("/delete-review/:id").delete(booksController.deleteReview);
router.route("/search").get(booksController.bookSearch);

export default router;
