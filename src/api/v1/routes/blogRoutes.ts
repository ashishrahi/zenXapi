import { Router } from "express";
import { blogController } from "../controllers/index";
import { upload } from "../../../middleware/upload";

const router = Router();

// Create blog with image upload
router.post("/create", upload.any(), (req, res) => blogController.createBlogController(req, res));

// Get all blogs
router.get("/", (req, res) => blogController.getBlogController(req, res));

// Get single blog by ID
router.get("/:id", (req, res) => blogController.getBlogbyIdController(req, res));

// Update blog by ID with optional image upload
router.put("/update/:id", upload.any(), (req, res) => blogController.updateBlogController(req, res));

// Delete blog by ID
router.delete("/delete/:id", (req, res) => blogController.deleteBlogController(req, res));

export default router;
