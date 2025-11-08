import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { supplierService } from "../services";
import { ApiResponse } from "../types/ApiResponse";

// Create supplier
export const createSupplierController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await supplierService.createSupplierService(payload)

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating supplier",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Get suppliers
export const getSupplierController = async (_req: Request, res: Response) => {
  try {
    const result = await supplierService.getSupplierService()

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching suppliers",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Update supplier
export const updateSupplierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await supplierService.updateSupplierService(id, payload)

    if (!result.data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Supplier not found or could not be updated",
      });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating supplier",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Delete supplier
export const deleteSupplierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await supplierService.deleteSupplierService(id)

    if (!result.data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Supplier not found or could not be deleted",
      });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting supplier",
      error: error instanceof Error ? error.message : error,
    });
  }
};
