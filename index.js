import express from 'express'





import connectDB from './config/database.js';

import userRoute from "./routes/authRoutes.js";
import cors from "cors";
const app = express();
// Allow CORS
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // If you're using cookies or authentication headers
  })
);


// const app = express();

// Connect to MongoDB
connectDB("bd");

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", userRoute);


app.get("/" , (req, res)=>{
  res.send("sever running")
})

// Start Server
const PORT = 4040;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
