import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../types/ApiResponse";
import { dashboardService } from "../services/index";

// Create Dashboard
export const getDashboardController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await dashboardService.getDashboardService(payload) as ApiResponse;
    res.status(StatusCodes.CREATED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating dashboard", error });
  }
};
