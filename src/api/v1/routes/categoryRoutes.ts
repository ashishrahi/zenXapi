import { Router } from "express";
import {categoryController} from '../controllers/index'
import { upload } from "../../../middleware/upload";

const router = Router();


router.post("/create",upload.any() ,categoryController.createCategoryController);
router.put("/update/:id",upload.any() ,categoryController.updateCategoryController);
router.get("/", categoryController.getCategoryController);
router.get("/:id", categoryController.getCategorybyIdController);
router.delete("/delete/:id", categoryController.updateCategoryController);



export default router;
