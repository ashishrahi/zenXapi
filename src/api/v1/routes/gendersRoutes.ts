import { Router } from "express";
import { genderController } from "../controllers/index"; // make sure genderController is exported

const router = Router();

// Create a new gender
router.post("/create", genderController.createGenderController);

// Get all genders
router.get("/", genderController.getGenderController);

// Update a gender by ID
router.put("/update/:id", genderController.updateGenderController);

// Delete a gender by ID
router.delete("/delete/:id", genderController.deleteGenderController);

export default router;
