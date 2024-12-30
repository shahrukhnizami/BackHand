import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
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

const User = mongoose.model("User", userSchema);
export default User;

