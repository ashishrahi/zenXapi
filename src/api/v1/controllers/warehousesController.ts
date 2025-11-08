import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { warehouseService } from "../services";
import { ApiResponse } from "../types/ApiResponse";

// Create warehouse
export const createWarehouseController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = (await warehouseService.createWarehouseService(payload)) as ApiResponse;

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating warehouse",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Get all warehouses
export const getWarehouseController = async (_req: Request, res: Response) => {
  try {
    const result = (await warehouseService.getWarehouseService()) as ApiResponse;

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching warehouses",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Get warehouse by ID
export const detailWarehouseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = (await warehouseService.detailWarehouseService(id)) as ApiResponse;

    if (!result.data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Warehouse not found",
      });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching warehouse details",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Update warehouse
export const updateWarehouseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = (await warehouseService.updateWarehouseService(id, payload)) as ApiResponse;

    if (!result.data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Warehouse not found or could not be updated",
      });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating warehouse",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Delete warehouse
export const deleteWarehouseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body; // or req.params.id depending on your route

    const result = (await warehouseService.deleteWarehouseService(id)) as ApiResponse;

    if (!result.data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Warehouse not found or could not be deleted",
      });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting warehouse",
      error: error instanceof Error ? error.message : error,
    });
  }
};
