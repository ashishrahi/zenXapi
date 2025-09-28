import { Router } from "express";
import {cityController} from '../controllers/index'


const router = Router();

router.post("/create",cityController.createCityController);
router.get("/", cityController.getCityController);
router.put("/update/:id",cityController.updateCityController);
router.delete("/delete/:id", cityController.deleteCityController);



export default router;
