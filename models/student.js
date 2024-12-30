import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: String,
    nic: String,
    email: String,
    pasword: String,
    address: String,
    city: String,
    Phone: String,
    monthlyRent: Number,
    Room: Number,
    startDate: { type: Date },
}, { timestamps: true });

const Student = mongoose.model("student", studentSchema);
export default Student;

