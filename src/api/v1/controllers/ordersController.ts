import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { orderService } from "../services";
import { ApiResponse } from "../types/ApiResponse";
import { AuthRequest } from "../../../middleware/authMiddleware";

// Create Order
export const createOrderController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await orderService.createOrderService(payload) as ApiResponse;
    res.status(StatusCodes.CREATED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating order", error });
  }
};

// Get Orders
export const getOrdersController = async (req: AuthRequest, res: Response) => {
  try {
     if (!req.user) {
      return { 
        success: false, 
        message: "Unauthorized" 
      }
    }

    const role = req.user.role;
    const { success, message, data } = await orderService.getOrdersService(role) as ApiResponse;
    res.status(StatusCodes.OK)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error fetching orders", error });
  }
};

// Update Order
export const updateOrderController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const { success, message, data } = await orderService.updateOrderService(id, payload) as ApiResponse;
    res.status(StatusCodes.OK)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error updating order", error });
  }
};

// Delete Order
export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { success, message, data } = await orderService.deleteOrderService(id) as ApiResponse;
    res.status(StatusCodes.OK)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error deleting order", error });
  }
};
