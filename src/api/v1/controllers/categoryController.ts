import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { categoryService } from "../services/index";

// Generic error logger helper
const handleError = (res: Response, error: any, context = "") => {
  console.error(`${context} Error:`, error);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Server Error",
    error: error instanceof Error ? error.message : error,
  });
};

// Create Category
export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const files = req.files as Express.Multer.File[] | undefined;

    const result = await categoryService.createCategoryService({
      ...payload,
      images: files,
    });

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    handleError(res, error, "CreateCategoryController");
  }
};

// Get Categories
export const getCategoryController = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getCategoryService();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    handleError(res, error, "GetCategoryController");
  }
};

// Update Category
export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const files = req.files as Express.Multer.File[] | undefined;

    const result = await categoryService.updateCategoryService(id, { ...payload, images: files });

    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("Update Controller Error:", error);
    res.status(500).json({ message: "Server Error", error: error instanceof Error ? error.message : error });
  }
};



// Delete Category
export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await categoryService.deleteCategoryService(id);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    handleError(res, error, "DeleteCategoryController");
  }
};
