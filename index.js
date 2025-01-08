import express from 'express'



import connectDB from './config/database.js';

import userRoute from "./routes/authRoutes.js";


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", userRoute);

// Start Server
const PORT = 4040;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
