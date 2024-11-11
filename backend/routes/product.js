// import express from 'express';
// import {
//   allProducts,
//   detailProducts,
//   createProduct,
//   deleteProduct,
//   updateProduct,
//   createReview,
// //   adminProducts
// } from '../controllers/product.js';
// // import { authenticationMid, roleChecked } from '../middleware/auth.js';

// const router = express.Router();

// router.get('/', allProducts);
// // router.get('/admin/products', authenticationMid, roleChecked("admin"), adminProducts);
// router.get('/products/:id', detailProducts);
// router.post('/', createProduct);
// router.post('/product/newReview', createReview);
// router.delete('/products/:id', deleteProduct);
// router.patch('/products/:id', updateProduct);

// export default router;



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