import { Router } from "express";
import {subcategoryController} from '../controllers/index'
import { upload } from "../../../middleware/upload";
const router = Router();



router.post("/create", upload.any(),subcategoryController.createSubCategoryController);
router.put("/update/:id",upload.any() ,subcategoryController.updateSubCategoryController);
router.get("/", subcategoryController.getSubCategoryController);
router.get("/:id", subcategoryController.getSubCategorybyIdController);

router.delete("/delete/:id", subcategoryController.deleteSubCategoryController);



export default router;
