import { Router } from "express";
import {stateController} from '../controllers/index'


const router = Router();

router.post("/create",stateController.createStateController);
router.get("/", stateController.getStateController);
router.put("/update/:id",stateController.updateStateController);
router.delete("/delete/:id", stateController.deleteStateController);



export default router;
