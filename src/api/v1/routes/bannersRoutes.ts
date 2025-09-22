import { Router } from "express";
import { bannersController } from "../controllers/index";
import { upload } from "../../../middleware/upload";

const router = Router();

// Create Banner (multiple images)
router.post("/create", upload.array("images", 5), bannersController.createBannersController);

// Get all banners
router.get("/", bannersController.getBannersController);

// Update banner (optional multiple images)
router.put("/update/:id", upload.array("images", 5), bannersController.updateBannersController);

// Delete banner
router.delete("/delete/:id", bannersController.deleteBannersController);

export default router;
