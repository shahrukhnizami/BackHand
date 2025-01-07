import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import UsersRoutes from "./routers/users.js";
import authRoutes from "./routers/auth.js";
import taskRoutes from "./routers/task.js";
import studentsRoutes from "./routers/students.js";
import uploadRoutes from "./routers/upload.js";

const app = express();
const PORT = 4040;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// MongoDB Connection
mongoose
  .connect(process.env.MONGOBDURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Routes
app.use("/users", UsersRoutes);
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/students", studentsRoutes);
app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("My first app is running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
