import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bannerService } from "../services";
import { MESSAGES } from "../../../message/messages";

// Create Banner
export const createBannersController = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Images are required" });
    }

    const result = await bannerService.createBannersService({ ...req.body, images: files });
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.BANNER.CREATE_FAILED, error });
  }
};

// Update Banner
export const updateBannersController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Banner ID required" });

    const files = req.files as Express.Multer.File[];
    const result = await bannerService.updateBannersService(id, { ...req.body, images: files });
    res.status(result.success ? StatusCodes.OK : StatusCodes.BAD_REQUEST).json(result);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.BANNER.UPDATE_FAILED, error });
  }
};

// Get all banners
export const getBannersController = async (_req: Request, res: Response) => {
  try {
    const result = await bannerService.getBannersService();
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.BANNER.FETCH_FAILED, error });
  }
};

// Delete Banner
export const deleteBannersController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await bannerService.deleteBannersService(id);
    res.status( StatusCodes.OK).json(result);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.BANNER.DELETE_FAILED, error });
  }
};