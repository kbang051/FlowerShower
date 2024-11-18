import mongoose, { Schema } from "mongoose"

const productSchema = new Schema({
    name: { type: String, required: true },
    productID : { type: String, required: true, unique: true },
    parentCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    imagePath: { type: String },
    color: { type: String }, 
    productType: { type: String },
    gender: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true},
    stock: { type: Number, required: true, default: 100 },
    // categories: { type: mongoose.Schema.Types.ObjectId , ref: "Category" },
    image: { type: String, required: true },
    brand: { type: String, required: true },  
    ratings: { 
        averageRating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 } 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

export const Product = mongoose.model("Product", productSchema)

