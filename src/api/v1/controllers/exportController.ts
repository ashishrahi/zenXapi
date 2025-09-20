import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {UserSignInResponse} from '../types/UserSignInResponse'
import { exportService } from "../services";



// createExportController
export const createExportController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await exportService.createExportService(payload) as UserSignInResponse
    res.status(StatusCodes.CREATED )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error In", error });
  }
};

// getExportController
export const getExportController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await exportService.getExportService(payload) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};

// updateExportController
export const updateExportController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const {id} = req.params
    const { success, message, data } = await exportService.updateExportService(id,payload) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};


// deleteExportController
export const deleteExportController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await exportService.deleteExportService(payload) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
