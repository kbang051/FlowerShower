import Router from "express" 
import { addToCart, viewCart, removeFromCart, updateQuantity } from "../controllers/cart.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/addToCart").post(verifyJWT, addToCart)
router.route("/updateQuantity").post(verifyJWT, updateQuantity)
router.route("/viewCart").get(verifyJWT, viewCart)
router.route("/removeFromCart").post(verifyJWT, removeFromCart)

export default router