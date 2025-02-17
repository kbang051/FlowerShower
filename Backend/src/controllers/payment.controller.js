import Stripe from "stripe"
import ApiError from "../utils/ApiError.js"
import { Cart } from "../models/Cart.model.js"
import { s3, generateSignedUrl } from "../aws.config.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const payment = async (req, res) => {
    try {
        const userId = req.user?._id 
        if (!userId) {
            throw new ApiError(400, "Unable to fetch userId to process payment") 
        }

        const cart = await Cart.findOne({ userId: userId }).populate('items.productId')
        if (!cart || cart.items.length === 0) {
            return res.status(200).json([])
        }

        const lineItems = await Promise.all(cart.items.map(async (item) => {
            const product = item.productId
            const imageUrl = await generateSignedUrl(
                product.parentCategory, 
                product.gender, 
                product.image
            )

            return {
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: product.name,
                        images: [imageUrl], 
                    },
                    unit_amount: Math.round(product.price * 100), 
                },
                quantity: item.quantity
            }
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/paymentFailed"
        })

        res.status(200).json({ id: session.id })

    } catch (error) {
        console.error("Payment error:", error)
        res.status(500).json({ 
            error: error.message,
            details: error.raw ? error.raw : null
        })
    }
}

export { payment }