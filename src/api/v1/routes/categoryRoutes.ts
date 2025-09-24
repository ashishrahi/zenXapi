import { Router } from "express";
import {categoryController} from '../controllers/index'
import { upload } from "../../../middleware/upload";

const router = Router();

router.post("/create",upload.any() ,categoryController.createCategoryController);
router.get("/", categoryController.getCategoryController);
router.put("/update/:id",upload.any() ,categoryController.updateCategoryController);
router.delete("/delete/:id", categoryController.updateCategoryController);



export default router;
