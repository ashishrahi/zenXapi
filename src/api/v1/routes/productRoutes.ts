// Alternative approach with nested routers
import { Router } from "express";
import { productController } from '../controllers/index'
import { upload } from "../../../middleware/upload";

const router = Router();

// Product routes
router.post("/create", upload.any(), productController.createProductController);
router.get("/", productController.getProductController);
router.get("/productId/:id", productController.getProductByIdController);
router.get("/:slug", productController.getProductBySlugController);
router.put("/update/:id", upload.any(), productController.updateProductController);
router.delete("/delete/:id", productController.deleteProductController);

// Collection routes
router.get("/collections/:slug", productController.getProductsByCollectionSlugController);

export default router;