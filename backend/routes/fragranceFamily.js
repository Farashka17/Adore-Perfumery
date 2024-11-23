import express from "express";
import { 
  getFragranceFamilies, 
  getSingleFragranceFamily, 
  editFragranceFamily, 
  addFragranceFamily, 
  deleteFragranceFamily 
} from "../controllers/fragranceFamily.js";

const router = express.Router();

router.post("/", addFragranceFamily);
router.get('/', getFragranceFamilies);
router.get('/:fragranceId', getSingleFragranceFamily);
router.patch('/:fragranceId', editFragranceFamily);
router.delete('/:fragranceId', deleteFragranceFamily);

export default router;
