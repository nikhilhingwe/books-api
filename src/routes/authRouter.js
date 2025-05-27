import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

// register-route
router.route("/signup").post(authController.register);
// login-route
router.route("/login").post(authController.login);

export default router;
