import express from "express";
import { enquireController } from "../controllers/index";

const router = express.Router();

router.post("/create", enquireController.createEnquireController);
router.get("/", enquireController.getEnquireController);
router.put("/update/:id", enquireController.updateEnquireController);
router.delete("/delete/:id", enquireController.deleteEnquireController);

export default router;
