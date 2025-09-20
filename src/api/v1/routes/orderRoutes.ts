import { Router } from "express";
import { ordersController } from "../controllers/index"; // make sure ordersController is exported
// import any other middleware like auth if needed

const router = Router();

// Create a new order
router.post("/create", ordersController.createOrder);

// Get all orders
router.get("/", ordersController.getOrders);

// Update an existing order by ID
router.put("/update/:id", ordersController.updateOrder);

// Delete an order by ID
router.delete("/delete/:id", ordersController.deleteOrder);

export default router;
