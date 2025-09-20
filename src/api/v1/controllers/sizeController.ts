import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {UserSignInResponse} from '../types/UserSignInResponse'
import { sizeService } from "../services";



// createSizeController
export const createSizeController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await sizeService.createSizeService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating gender", error });
  }
};

// getSizeController
export const getSizeController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await sizeService.getSizeService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};

// updateSizeController
export const updateSizeController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const {id} = req.params
    const { success, message, data } = await sizeService.updateSizeService(id,payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};


// deleteSizeController
export const deleteSizeController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const { success, message, data } = await sizeService.deleteSizeService(id) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
