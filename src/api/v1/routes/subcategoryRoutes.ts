import { Router } from "express";
import {subcategoryController} from '../controllers/index'
import { upload } from "../../../middleware/upload";


const router = Router();

router.post("/create" ,subcategoryController.createSubCategoryController);
router.get("/", subcategoryController.getSubCategoryController);
router.put("/update/:id", subcategoryController.updateSubCategoryController);
router.delete("/delete/:id", subcategoryController.updateSubCategoryController);



export default router;
