import express from "express";
import multer from "multer";
import sendResponse from "../helpers/sendResponce.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// // Ensure upload directory exists
const uploadDir = path.join( "upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// // Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to handle file upload and form data
router.post("/", upload.single("file"), (req, res) => {
  const receivedData = req.body; // Access the sent object
  console.log("Data received from frontend:", receivedData);

  // Process the data as needed
  res.status(201).json({
    message: "Data received successfully",
    data: receivedData,
    file: req.file, // Include file details
  });
});

// Route to handle GET requests
// router.get("/", (req, res) => {
//   const receivedData = req.query; // Fetch query params
//   sendResponse(res, 201, receivedData, false, "Name Fetch Successfully");
// });

export default router;
