import express, { Router } from "express"
import User from "../models/user.js";
import sendResponse from "../helpers/sendResponce.js";


const router = express.Router();

router.post("/", async (req, res) => {
    const { user } = req.body;
    let newUser = new User(user);
    newUser = await newUser.save();
    console.log("body=>",newUser);
    
    sendResponse(res, 201, newUser, false, "User Added Successfully");
  });


router.get('/', async (req, res) => {
    const users = await User.find()
    sendResponse(res, 201, users, false, "Users Fetch Successfully");
})







export default router;