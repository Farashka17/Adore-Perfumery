
import express from "express"

import {getProducts,
    getSingleProduct,
    deleteProduct,
    editProduct,
    createProduct} from "../controllers/product.js"

    const router = express.Router();

    router.post("/",createProduct)
    router.get("/",getProducts)
    router.get("/:id",getSingleProduct)
    router.patch("/:id",editProduct)
    router.delete("/:id",deleteProduct)

    export default router 