import { Router } from "express";
import {categoryController} from '../controllers/index'
import { upload } from "../../../middleware/upload";


const router = Router();

router.post("/create" ,categoryController.createCategoryController);
router.get("/", categoryController.getCategoryController);
router.put("/update/:id", categoryController.updateCategoryController);
router.delete("/delete/:id", categoryController.updateCategoryController);



export default router;
