import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)  // http://localhost:8000/api/v1/users/register

import databaseRouter from "./routes/database.routes.js"

app.use("/api/v1/addingToDatabase", databaseRouter) // http://localhost:8000/api/v1/addingToDatabase/products
                                                    // http://localhost:8000/api/v1/addingToDatabase/categories

import productRouter from "./routes/products.routes.js"
// GET request
app.use("/api/v1/getProducts", productRouter) // http://localhost:8000/api/v1/getProducts/getProducts
                                              // http://localhost:8000/api/v1/getProducts/getFilters

import cartRouter from "./routes/cart.routes.js"

app.use("/api/v1/cart", cartRouter) // http://localhost:8000/api/v1/cart/addToCart            --POST
                                    // http://localhost:8000/api/v1/cart/viewCart             --GET
                                    // http://localhost:8000/api/v1/cart/updateQuantity       --POST
                                    // http://localhost:8000/api/v1/cart/removeFromCart       --POST
                                              
import paymentRouter from "./routes/payment.routes.js"

app.use("/api/v1/payment", paymentRouter) // http://localhost:8000/api/v1/payment/stripePaymentGateway       --POST

export { app };
