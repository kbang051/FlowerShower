import { Router } from "express"
import { payment } from "../controllers/payment.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/stripePaymentGateway").post(verifyJWT, payment)
// http://localhost:8000/api/v1/payment/stripePaymentGateway

export default router 