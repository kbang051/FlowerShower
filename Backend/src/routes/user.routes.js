import { Router } from "express"
import { generateAccessAndRefreshTokens, registerUser, registerAfterVerification, loginUser, changeCurrentPassword, logoutUser, refreshAccessToken } from "../controllers/user.controller.js"
import { sendOTP, verifyOTP } from "../middlewares/otp.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/sendOtp").post(sendOTP)
router.route("/registerAfterVerification").post(verifyOTP, registerAfterVerification)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refreshToken").post(refreshAccessToken)
router.route("/changeCurrentPassword").post(verifyJWT, changeCurrentPassword)


export default router



