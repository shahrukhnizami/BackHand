import express, { query, Router } from "express"
import Student from "../models/student.js";
import sendResponse from "../helpers/sendResponce.js";


const router = express.Router();

router.post("/", async (req, res) => {
    const { name,email,pasword } = req.body;
    let newStudent = new Student({ name,email,pasword });
    newStudent = await newStudent.save();
    console.log("body=>",newStudent);
    
    sendResponse(res, 201, newStudent, false, "Students Added Successfully");
  });


router.get('/', async (req, res) => {
// 1.  Find students who have not graduated.
    const studentsNotGraduate = await Student.find({ 'graduated': false })
    const all = await Student.find()
// 2.  Find students who have graduated
    const studentsGraduate = await Student.find({ 'graduated': true })
//3.   Find students older than 22 years
    const graduatedreaterthen22 = await Student.find(
      {age: {$gte: 22}},
    );

   
      
    
    const score = await Student.find({ "scores.english": { $gt: 70 } })
    

  
    sendResponse(res, 201, all, false, "Students Fetch Successfully");


})







export default router;