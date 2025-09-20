import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {UserSignInResponse} from '../types/UserSignInResponse'
import { colorService } from "../services";



// createColorController
export const createColorController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await colorService.createColorService(payload) as UserSignInResponse
    res.status(StatusCodes.CREATED )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating gender", error });
  }
};

// getColorController
export const getColorController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await colorService.getColorService(payload) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};

// updateColorController
export const updateColorController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const {id} = req.params
    const { success, message, data } = await colorService.updateColorService(id,payload) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};


// deleteColorController
export const deleteColorController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const { success, message, data } = await colorService.deleteColorService(id) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
