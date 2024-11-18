import { User } from "../models/User.model.js";
import { OTP } from "../models/Otp.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import nodemailer from "nodemailer";
import ApiResponse from "../utils/ApiResponse.js";

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}

const sendOTP = asyncHandler(async (req, res, next) => {
    const { email } = req.body 
    const otp = generateOTP() 
    await OTP.findOneAndUpdate( {email}, { $set: { otp, createdAt: new Date() }  }, { upsert: true })

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    try {
        await transporter.sendMail({
            from: process.env.EMAIL, 
            to: email, 
            subject: "OTP",
            html: `<b>Your OTP is: ${otp}</b>`
        })
        res.status(200).json({ message: "OTP sent successfully" })
    } catch (error) {
        console.log(error)
        next(new ApiError(500, "Failed to send OTP email"))
    }
})

const verifyOTP = asyncHandler(async (req, res, next) => {
    console.log(req.body)              
    const { email, otp } = req.body
    const otpRecord = await OTP.findOne({ email })
    if (!otpRecord || otpRecord.otp != otp) {
        return next(new ApiError(400, "Invalid or expired OTP"))
    }
    await OTP.deleteOne({email})
    next() 
})

export { sendOTP, verifyOTP }

//find user 
// At the time of registration -> through username/email (user is providing as input)
//        login                -> through username/password
//        forgetPassword       -> through username/email (user is providing as input)

