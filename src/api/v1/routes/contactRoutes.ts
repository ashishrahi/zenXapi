import { Router } from "express";
import { contactController } from "../controllers/index"; // make sure contactController is exported
// import any other middleware like auth if needed

const router = Router();

// Create a new contact
router.post("/create", contactController.createContact);

// Get all contacts
router.get("/", contactController.getContacts);

// Update an existing contact by ID
router.put("/update/:id", contactController.updateContact);

// Delete a contact by ID
router.delete("/delete/:id", contactController.deleteContact);

export default router;
