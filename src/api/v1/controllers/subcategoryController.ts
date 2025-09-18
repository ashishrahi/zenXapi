import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {subcategoryService} from "../services/index";
import {UserSignInResponse} from '../types/UserSignInResponse'



// createSubCategoryController
export const createSubCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await subcategoryService.createSubCategoryService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating user", error });
  }
};

// getSubCategoryController
export const getSubCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await subcategoryService.getSubCategoryService(payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};

// updateSubCategoryController
export const updateSubCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const {id} = req.params
    const { success, message, data } = await subcategoryService.updateSubCategoryService(id, payload) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};


// deleteSubCategoryController
export const deleteSubCategoryController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const { success, message, data } = await subcategoryService.deleteSubCategoryService(id) as UserSignInResponse
    res.status(success ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
