import { Router } from "express";
import {exportController} from '../controllers/index'


const router = Router();

router.post("/create",exportController.createExportController);
router.get("/", exportController.getExportController);
router.put("/update/:id",exportController.updateExportController);
router.delete("/delete/:id", exportController.updateExportController);



export default router;
