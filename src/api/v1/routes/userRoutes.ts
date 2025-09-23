import express from "express";
import { userController} from "../controllers/index";

const router = express.Router();


router.get("/",  userController.getUserController);
router.put("/:id", userController.updateUserController);
router.delete("/:id",  userController.deleteUserController);

export default router;
