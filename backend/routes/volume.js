import express from "express";
import { 
    getVolumes,
    getSingleVolume,
    deleteVolume,
    editVolume,
    addVolume
} from "../controllers/volume.js";

const router = express.Router();

router.post("/", addVolume);
router.get('/', getVolumes);
router.get('/:volumeId', getSingleVolume);
router.patch('/:volumeId', editVolume);
router.delete('/:volumeId', deleteVolume);

export default router;
