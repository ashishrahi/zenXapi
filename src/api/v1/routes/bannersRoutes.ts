import { Router } from "express";
import {bannersController} from '../controllers/index'
import { upload } from "../../../middleware/upload";


const router = Router();

router.post("/create",upload.single("image") ,bannersController.createBannersController);
router.get("/", bannersController.getBannersController);
router.put("/update/:id",upload.single("image") ,bannersController.updateBannersController);
router.delete("/delete/:id", bannersController.updateBannersController);



export default router;
