import { Router } from "express";
import additionOfProducts from "../addDataToDatabase/additionOfProducts.js";

const router = Router()

router.route("/products").post(additionOfProducts)

export default router 


