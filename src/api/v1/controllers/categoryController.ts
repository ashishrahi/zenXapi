import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {categoryService} from "../services/index";
import {UserSignInResponse} from '../types/UserSignInResponse'



// createCategoryController
export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await categoryService.createCategoryService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating user", error });
  }
};

// getCategoryController
export const getCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await categoryService.getCategoryService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};

// updateCategoryController
export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const {id} = req.params
    const { success, message, data } = await categoryService.updateCategoryService(id, payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};


// deleteCategoryController
export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const { success, message, data } = await categoryService.deleteCategoryService(id) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
