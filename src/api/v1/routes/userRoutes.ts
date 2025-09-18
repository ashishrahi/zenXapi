import { Router } from "express";
import {userController} from '../controllers/index'


const router = Router();

router.post("/signup", userController.signUpUser);
router.post("/signin", userController.signInUser);

export default router;
