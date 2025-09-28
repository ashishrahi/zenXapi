import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { countryService } from "../services";
import { ApiResponse } from "../types/ApiResponse";
import { getCountryService } from "../services/countryService";

// Create Country
export const createCountryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const { success, message, data } = await countryService.createCountryService(payload) as ApiResponse;

    res.status(StatusCodes.CREATED).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating country",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Get All Countries
export const getCountryController = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const after = req.query.after as string | undefined;

    const { success, message, data, nextCursor, count } = await getCountryService(limit, after);

    res.status(StatusCodes.OK).json({
      success,
      message,
      data,
      nextCursor,
      count,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching countries",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Update Countries
export const updateCountryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const { success, message, data } = await countryService.updateCountryService(id, payload) as ApiResponse;

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Country not found or could not be updated",
      });
    }

    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating country",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Delete Country
export const deleteCountryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { success, message, data } = await countryService.deleteCountryService(id) as ApiResponse;

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Country post not found or could not be deleted",
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
