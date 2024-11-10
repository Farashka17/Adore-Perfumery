import express from 'express';
import { allProducts, detailProducts, createProduct, deleteProduct, updateProduct, createReview, adminProducts } from '../controllers/product.js';
import { authenticationMid, roleChecked } from '../middleware/auth.js';


const router = express.Router()
router.get('/',allProducts)
router.get('/admin/products',authenticationMid,roleChecked("admin"),adminProducts,)
router.get('/products/:id',detailProducts)
router.post('/',authenticationMid,roleChecked("admin"),createProduct)
router.post('/product/newReview',authenticationMid,createReview)
router.delete('/products/:id',authenticationMid,roleChecked("admin"),deleteProduct)
router.patch('/products/:id',authenticationMid,roleChecked("admin"),updateProduct)



export default router