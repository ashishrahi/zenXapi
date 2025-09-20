import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { categoryService } from "../services/index";
import { UserSignInResponse } from "../types/UserSignInResponse";

// createCategoryController
export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const files = req.files as Express.Multer.File[];

    const result = await categoryService.createCategoryService({
      ...payload,
      images: files,
    });

    res
      .status(result.status ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST)
      .json(result);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error signing in", error });
  }
};

// getCategoryController
export const getCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } =
      (await categoryService.getCategoryService(payload)) as UserSignInResponse;
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error signing in", error });
  }
};

// updateCategoryController
export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { id } = req.params;
     const files = req.files as Express.Multer.File[];
      const categorydata =  {
      ...payload,
      images: files, 
    }
    const { success, message, data } =
      (await categoryService.updateCategoryService(
        id,
        categorydata
      )) as UserSignInResponse;
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error signing in", error });
  }
};

// deleteCategoryController
export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { success, message, data } =
      (await categoryService.deleteCategoryService(id)) as UserSignInResponse;
    res
      .status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
      .json({ success, message, data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error signing in", error });
  }
};
