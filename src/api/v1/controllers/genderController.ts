import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {UserSignInResponse} from '../types/UserSignInResponse'
import { genderService } from "../services";



// createGenderController
export const createGenderController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await genderService.createGenderService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating gender", error });
  }
};

// getGenderController
export const getGenderController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await genderService.getGenderService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};

// updateGenderController
export const updateGenderController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await genderService.updateGenderService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};


// deleteGenderController
export const deleteGenderController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await genderService.deleteGenderService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
