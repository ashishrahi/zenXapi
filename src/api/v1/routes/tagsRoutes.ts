import { Router } from "express";
import {tagController} from '../controllers/index'


const router = Router();

router.post("/create",tagController.createTagController);
router.get("/", tagController.getTagController);
router.put("/update/:id",tagController.updateTagController);
router.delete("/delete/:id", tagController.updateTagController);



export default router;
