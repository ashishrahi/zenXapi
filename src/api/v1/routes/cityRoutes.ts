import { Router } from "express";
import {cityController} from '../controllers/index'
import { validateRequest } from "../../../middleware/validateRequest";
import { createCitySchema } from "../../../validation/cityJoi";


const router = Router();

router.post("/create",validateRequest(createCitySchema),cityController.createCityController);
router.get("/", cityController.getCityController);
router.put("/update/:id",cityController.updateCityController);
router.delete("/delete/:id", cityController.deleteCityController);



export default router;
