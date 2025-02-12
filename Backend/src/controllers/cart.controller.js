import { User } from "../models/User.model.js";
import { Product } from "../models/Products.model.js";
import { Cart } from "../models/Cart.model.js";
import { generateSignedUrl } from "./products.controller.js";
import AWS from "aws-sdk";
import ApiError from "../utils/ApiError.js";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_AWS,
  secretAccessKey: process.env.SECRET_KEY_AWS,
  region: process.env.AWS_BUCKET_REGION,
});

const s3 = new AWS.S3();

const addToCart = async (req, res) => {
    try {
        const userID = req.user?._id;
        if (!userID)
            throw new ApiError(500, "Unable to read userID")

        const user = await User.findById(userID)
        if (!user)
            throw new ApiError(500, "User not found")
        
        const { productId, quantity = 1 } = req.body;
        if (!productId)
            throw new ApiError(500, "Unable to read productId")

        const cart = await Cart.findOne({ userId: userID });
        
        if (!cart) {
            const newCart = await Cart.create({
                userId: userID,
                items: [{productId: productId, quantity: quantity}]
            })
            await newCart.save()
        } else {
            const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)
            if (itemIndex !== -1)
                cart.items[itemIndex].quantity += quantity
            else 
                cart.items.push({productId: productId, quantity: quantity})
            await cart.save()  
        }

        return res.status(200).json({message: 'Product has been successfully added to cart'})
    } catch (error) {
        throw new ApiError(500, `Unable to add product to cart: ${error}`)
    }
}

const viewCart = async (req, res) => {
    try {
        const userId = req.user?._id
        const cart = await Cart.findOne({userId: userId}).populate('items.productId')
        if (!cart)
            return res.status(200).json([])
        const items = cart.items
        
        return res.status(200).json(items)
    } catch (error) {
        throw new ApiError(500, `Unable to view cart: ${error}`)
    }
}

const updateQuantity = async (req, res) => {
    try {
        const userId = req.user?._id
        const { operation, productId } = req.body 
        const cart = await Cart.findOne({userId: userId}) 
        if (!cart)
            throw new ApiError(500, "Cart not found")
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)
        
        if (itemIndex !== -1) {
            if (operation === "+")
                cart.items[itemIndex].quantity += 1
            if (operation === "-")
                cart.items[itemIndex].quantity -= 1 
        }

        if (cart.items[itemIndex].quantity <=0)
            cart.items = cart.items.filter((item) => item.productId.toString() !== productId)

        await cart.save()
        return res.status(200).json({message: "Quantity has been successfully updated"})
    } catch (error) {
        throw new ApiError(500, `Unable to update quantity: ${error}`)
    }
}

export { addToCart, viewCart, updateQuantity }