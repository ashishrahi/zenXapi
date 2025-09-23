import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {userService} from "../services/index";
import {UserSignInResponse} from '../types/UserSignInResponse'



// getUserController
export const getUserController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await userService.getUserService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating user", error });
  }
};

// updateUserController
export const updateUserController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const {id} = req.params
    const { success, message, data } = await userService.updateUserService(id,payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};



// deleteUserController
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const { success, message, data } = await userService.deleteUserService(id) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
