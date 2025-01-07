import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String},
    nic: { type: String},
    advance: { type: Number },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    room: { type: Number},
    startDate: { type: Date},
    city: { type: String},
    country: { type: String },
    portionNumber: { type: Number },
    monthlyRent: { type: Number},
    nicPicture: { type: String },
    contactNumber: { type: String},
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;

