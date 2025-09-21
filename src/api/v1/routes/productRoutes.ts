import { Router } from "express";
import {productController} from '../controllers/index'
import { upload } from "../../../middleware/upload";
const router = Router();



router.post("/create" , upload.array("images", 10) ,productController.createProductController);
router.get("/",  productController.getProductController);
router.get("/:slug",  productController.getProductbyIdController);
router.put("/update/:id",upload.array("images", 10),productController.updateProductController);
router.delete("/delete/:id", productController.updateProductController);



export default router;
