import { Router } from "express";
import {stateController} from '../controllers/index'
import { validateRequest } from "../../../middleware/validateRequest";
import { createStateSchema } from "../../../validation/stateJoi";


const router = Router();

router.post("/create",validateRequest(createStateSchema),stateController.createStateController);
router.get("/", stateController.getStateController);
router.put("/update/:id",stateController.updateStateController);
router.delete("/delete/:id", stateController.deleteStateController);



export default router;
