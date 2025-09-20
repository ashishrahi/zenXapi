import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bannerService } from "../services";
import { MESSAGES } from "../../../message/messages";

// Create Banner
export const createBannersController = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const bannerData = {
      ...req.body,
      image: file.path, // Cloudinary URL
    };

    const { success, message, data } = await bannerService.createBannersService(bannerData);
    res.status(StatusCodes.CREATED).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.BANNER.CREATE_FAILED, error });
  }
};

// Get All Banners
export const getBannersController = async (_req: Request, res: Response) => {
  try {
    const { success, message, data } = await bannerService.getBannersService();
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.BANNER.FETCH_FAILED, error });
  }
};

// Update Banner
export const updateBannersController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
      const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const bannerData = {
      ...req.body,
      image: file.path, // Cloudinary URL
    };

    const { success, message, data } = await bannerService.updateBannersService(id, bannerData);
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.BANNER.UPDATE_FAILED, error });
  }
};

// Delete Banner
export const deleteBannersController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { success, message, data } = await bannerService.deleteBannersService(id);
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.BANNER.DELETE_FAILED, error });
  }
};
