import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { enquireService } from "../services";
import { ApiResponse } from "../types/ApiResponse";

// Create Enquiry
export const createEnquireController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await enquireService.createEnquireService(payload) as ApiResponse;
    res.status(StatusCodes.CREATED).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error creating enquiry", error });
  }
};

// Get Enquiries
export const getEnquireController = async (req: Request, res: Response) => {
  try {
    const { success, message, data } = await enquireService.getEnquiresService() as ApiResponse;
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching enquiries", error });
  }
};

// Update Enquiry
export const updateEnquireController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const { success, message, data } = await enquireService.updateEnquireService(id, payload) as ApiResponse;
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error updating enquiry", error });
  }
};

// Delete Enquiry
export const deleteEnquireController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { success, message, data } = await enquireService.deleteEnquireService(id) as ApiResponse;
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error deleting enquiry", error });
  }
};
