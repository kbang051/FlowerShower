import mongoose, { Schema } from "mongoose";

const OTPSchema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "15m" },
});

export const OTP = mongoose.model("OTP", OTPSchema);
