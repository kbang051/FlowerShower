import { Router } from "express"
import { generateSignedUrl, fetchProducts, fetchFilters } from "../controllers/products.controller.js"

const router = Router()

router.route("/getProducts").get(fetchProducts)
router.route("/getFilters").get(fetchFilters)

export default router

