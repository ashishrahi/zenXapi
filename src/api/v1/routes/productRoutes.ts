import { Router } from "express";
import {productController} from '../controllers/index'
import { upload } from "../../../middleware/upload";
const router = Router();



router.post("/create" , upload.array("images", 10) ,productController.createProductController);
router.get("/", upload.array("images", 10), productController.getProductController);
router.put("/update/:id", productController.updateProductController);
router.delete("/delete/:id", productController.updateProductController);



export default router;
