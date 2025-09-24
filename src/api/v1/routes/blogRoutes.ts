import { Router } from "express";
import { blogController } from "../controllers/index";

const router = Router();

router.post("/create", (req, res) => blogController.createBlogController(req, res));
router.get("/", (req, res) => blogController.getBlogController(req, res));
router.get("/:id", (req, res) => blogController.getBlogbyIdController(req, res));
router.put("/udpate/:id", (req, res) => blogController.updateBlogController(req, res));
router.delete("/delete/:id", (req, res) => blogController.deleteBlogController(req, res));


export default router;
