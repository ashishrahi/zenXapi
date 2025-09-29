import { Router } from "express";
import {countryController} from '../controllers/index'
import { authorizeRoles,protect } from "../../../middleware/authMiddleware";


const router = Router();

router.post("/create",protect,authorizeRoles("user", "admin"),countryController.createCountryController);
router.get("/", countryController.getCountryController);
router.put("/update/:id",countryController.updateCountryController);
router.delete("/delete/:id", countryController.deleteCountryController);



export default router;
