import express from 'express';
import { register, login, forgetPassword, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/logout", logout);

export default router;
