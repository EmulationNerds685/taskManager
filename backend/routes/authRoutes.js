import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe
} from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../validators/authValidator.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login",    validateLogin,    loginUser);
router.post("/logout",                     logoutUser);
router.get("/me",        authMiddleware,   getMe);

export default router;