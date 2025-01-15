import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import connectDB from "../config/database.js";
import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const secretKey = "your_secret_key";


// Cloudinary configuration


// Register User
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error registering user.", error });
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Received email:", email);
    console.log("Received password:", password);

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid email or password." , data: [email , password] , "db" : connectDB()});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Password mismatch");
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
            expiresIn: "1h",
        });

        console.log("Login successful");
        res.status(200).json({
            message: "Login successful.",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role ,image: user.image},
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error logging in.", error });
    }
};


// Forget Password
export const forgetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();
        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error updating password.", error });
    }
};

// Logout User
export const logout = (req, res) => {
    res.status(200).json({ message: "Logged out successfully." });
};

// Get All Users
export const getAlluser = async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 }); // Exclude password field for security
      res.status(200).json({ message: "Users retrieved successfully.", users });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users.", error });
    }
  };
  
  // Delete User
  export const deleteUser = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "You do not have permission to delete users." });
      }
  
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user.", error });
    }
  };
  
  
