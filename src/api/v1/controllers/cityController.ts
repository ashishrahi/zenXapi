import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { cityService } from "../services";
import { ApiResponse } from "../types/ApiResponse";

// create city
export const createCityController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = (await cityService.createCityService(payload)) as ApiResponse;

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating city",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// get city
export const getCityController = async (_req: Request, res: Response) => {
  try {
    const result = (await cityService.getCityService()) as ApiResponse;

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching cities",
      error: error instanceof Error ? error.message : error,
    });
  }
};
// update city
export const updateCityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = (await cityService.updateCityService(id, payload)) as ApiResponse;

    if (!result.data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "City not found or could not be updated",
      });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating city",
      error: error instanceof Error ? error.message : error,
    });
  }
};
// delete city

export const deleteCityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = (await cityService.deleteCityService(id)) as ApiResponse;

    if (!result.data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "City not found or could not be deleted",
      });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting city",
      error: error instanceof Error ? error.message : error,
    });
  }
};
