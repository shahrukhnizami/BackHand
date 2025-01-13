import { register, login, forgetPassword, logout, getAlluser } from "../controllers/authController.js";
import express from 'express'

const router = express.Router();


import jwt from "jsonwebtoken";

const secretKey = "your_secret_key";

// Middleware to check if the user is authenticated
export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach decoded user to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

router.post("/register", register);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/logout", logout);

// Route to get all users
router.get("/users" , isAuthenticated , isAdmin, getAlluser);

export default router;
