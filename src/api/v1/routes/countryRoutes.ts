import { Router } from "express";
import {countryController} from '../controllers/index'
import { validateRequest } from "../../../middleware/validateRequest";
import { createCountrySchema, updateCountrySchema } from "../../../validation/countryJoi";


const router = Router();

router.post("/create",validateRequest(createCountrySchema),countryController.createCountryController);
router.get("/", countryController.getCountryController);
router.put("/update/:id",validateRequest(updateCountrySchema),countryController.updateCountryController);
router.delete("/delete/:id", countryController.deleteCountryController);



export default router;
