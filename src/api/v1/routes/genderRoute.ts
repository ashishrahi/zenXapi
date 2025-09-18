import { Router } from "express";
import {genderController} from '../controllers/index'


const router = Router();

router.post("/create", genderController.createGenderController);
router.get("/", genderController.getGenderController);
router.put("/update/:id", genderController.updateGenderController);
router.delete("/delete/:id", genderController.deleteGenderController);


export default router;
