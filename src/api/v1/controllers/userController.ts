import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {userService} from "../services/index";
import {UserSignInResponse} from '../types/UserSignInResponse'



// signup user
export const signUpUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await userService.userSignUpService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating user", error });
  }
};

// signin user
export const signInUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await userService.userSignInService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
