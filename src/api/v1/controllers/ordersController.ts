import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserSignInResponse } from '../types/UserSignInResponse';
import { orderService } from "../services";

// Create Order
export const createOrderController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await orderService.createOrderService(payload) as UserSignInResponse;
    res.status(StatusCodes.CREATED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating order", error });
  }
};

// Get Orders
export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const payload = req.body; // or req.query if fetching with filters
    const { success, message, data } = await orderService.getOrdersService(payload) as UserSignInResponse;
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
    const { success, message, data } = await orderService.updateOrderService(id, payload) as UserSignInResponse;
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
    const { success, message, data } = await orderService.deleteOrderService(id) as UserSignInResponse;
    res.status(StatusCodes.OK)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error deleting order", error });
  }
};
