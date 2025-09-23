import express from "express";
import { authController } from "../controllers/index";

const router = express.Router();

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);

export default router;
