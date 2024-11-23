import express from "express";
import { 
    getConcentrations,
    getSingleConcentration,
    deleteConcentration,
    editConcentration,
    addConcentration
} from "../controllers/concentration.js";

const router = express.Router();

router.post("/", addConcentration);
router.get('/', getConcentrations);
router.get('/:concentrationId', getSingleConcentration);
router.patch('/:concentrationId', editConcentration);
router.delete('/:concentrationId', deleteConcentration);

export default router;
