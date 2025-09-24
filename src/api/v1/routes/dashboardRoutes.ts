import { Router } from "express";
import { dashboardController } from "../controllers/index"; // make sure contactController is exported
// import any other middleware like auth if needed

const router = Router();

// Get all contacts
router.get("/", dashboardController.getDashboardController);

export default router