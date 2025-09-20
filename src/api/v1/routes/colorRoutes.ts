import { Router } from "express";
import {colorsController} from '../controllers/index'


const router = Router();

router.post("/create",colorsController.createColorController);
router.get("/", colorsController.getColorController);
router.put("/update/:id",colorsController.updateColorController);
router.delete("/delete/:id", colorsController.updateColorController);



export default router;
