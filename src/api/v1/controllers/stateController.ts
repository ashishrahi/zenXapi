import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { stateService } from "../services";
import { ApiResponse } from "../types/ApiResponse";

// Create State
export const createStateController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await stateService.createStateService(payload) as ApiResponse;

    res.status(StatusCodes.CREATED).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating state",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Get All States
export const getStateController = async (_req: Request, res: Response) => {
  try {
    const { success, message, data } = await stateService.getStateService() as ApiResponse;

    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching states",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Update States
export const updateStateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const { success, message, data } = await stateService.updateStateService(id, payload) as ApiResponse;

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "State not found or could not be updated",
      });
    }

    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating state",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Delete State
export const deleteStateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { success, message, data } = await stateService.deleteStateService(id) as ApiResponse;

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "State post not found or could not be deleted",
      });
    }

    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting country post",
      error: error instanceof Error ? error.message : error,
    });
  }
};
