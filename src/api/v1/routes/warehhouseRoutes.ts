import { Router } from "express";
const router = Router();
import { warehouseController } from "../controllers/index";

// Create Warehouse
router.post("/", warehouseController.createWarehouseController);

// Update Warehouse
router.put("/:id", warehouseController.updateWarehouseController);

// Get All Warehouses
router.get("/", warehouseController.getWarehouseController);

// Get Warehouse by ID (Detail)
router.get("/:id", warehouseController.detailWarehouseController);

// Delete Warehouse
router.delete("/", warehouseController.deleteWarehouseController);

export default router;
