import { Router } from "express";
import {countryController} from '../controllers/index'


const router = Router();

router.post("/create",countryController.createCountryController);
router.get("/", countryController.getCountryController);
router.put("/update/:id",countryController.updateCountryController);
router.delete("/delete/:id", countryController.deleteCountryController);



export default router;
