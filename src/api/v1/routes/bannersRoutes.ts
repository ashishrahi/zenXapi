import { Router } from "express";
import { bannersController } from "../controllers/index";
import { upload } from "../../../middleware/upload";
import { validateRequest } from "../../../middleware/validateRequest";
import { createBannersSchema, updateBannersSchema } from "../../../validation/bannersJoi";

const router = Router();

// Create Banner (multiple images)
router.post("/create",validateRequest(createBannersSchema) ,upload.any(), bannersController.createBannersController);

// Get all banners
router.get("/", bannersController.getBannersController);

// Update banner (optional multiple images)
router.put("/update/:id", validateRequest(updateBannersSchema) ,upload.any(), bannersController.updateBannersController);

// Delete banner
router.delete("/delete/:id", bannersController.deleteBannersController);

export default router;
