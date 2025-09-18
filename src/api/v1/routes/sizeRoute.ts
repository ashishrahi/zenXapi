import { Router } from "express";
import {sizeController} from '../controllers/index'


const router = Router();

router.post("/create", sizeController.createSizeController);
router.get("/", sizeController.getSizeController);
router.put("/update/:id", sizeController.updateSizeController);
router.delete("/delete/:id", sizeController.deleteSizeController);


export default router;
