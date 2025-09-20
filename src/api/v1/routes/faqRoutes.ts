import { Router } from "express";
import {faqController} from '../controllers/index'


const router = Router();

router.post("/create",faqController.createFaqController);
router.get("/", faqController.getFaqController);
router.put("/update/:id",faqController.updateFaqController);
router.delete("/delete/:id", faqController.updateFaqController);



export default router;
