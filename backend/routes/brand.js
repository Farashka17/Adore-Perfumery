import express from "express";
import { getBrands,getSingleBrand,editBrand,addBrand,deleteBrand } from "../controllers/brand.js";


const router = express.Router();

router.post("/",addBrand)
router.get('/',getBrands)
router.get('/:id',getSingleBrand)
router.patch('/:id',editBrand)
router.delete('/:id',deleteBrand)

export default router;