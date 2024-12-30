import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';
import UsersRoutes from "./routers/users.js"
import authRoutes from "./routers/auth.js";
import taskRoutes from "./routers/task.js";
import studentsRoutes from "./routers/students.js";
// import { authenticateUser } from "./middleware/authentication.js";
import cors from "cors";

const app = express();
const PORT = 4040
app.use(express.json());
app.use(cors("*"));


mongoose.connect(process.env.MONGOBDURI)
.then(()=>console.log("Mongo db is connected"))
.catch((err)=>console.log("eroe",err))

app.use("/users",UsersRoutes)
app.use("/auth", authRoutes);
app.use("/task",  taskRoutes);
app.use("/students",  studentsRoutes);

app.get("/",(req,res)=>{
    // console.log(req);
    res.send("My first Appsas")
    
})
app.listen(PORT,()=>{console.log("Server Is Running"+PORT)}
)