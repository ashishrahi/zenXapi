import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {productService} from "../services/index";
import {UserSignInResponse} from '../types/UserSignInResponse'



// createProductController
export const createProductController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
       const files = req.files as Express.Multer.File[];
    const { success, message, data } = await productService.createProductService({
      ...payload,
      images: files, 
    }) as UserSignInResponse
    res.status( StatusCodes.CREATED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating user", error });
  }
};

// getProductController
export const getProductController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await productService.getProductService(payload) as UserSignInResponse
    res.status(StatusCodes.OK)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};

// getProductbyIdController
export const getProductbyIdController = async (req: Request, res: Response) => {
  try {
    const {slug} = req.params;
    const { success, message, data } = await productService.getProductbyIdService(slug) as UserSignInResponse
    res.status(StatusCodes.OK)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
// updateProductController
export const updateProductController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const {id} = req.params;
     const files = req.files as Express.Multer.File[];
      if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Subcategory ID is required",
      });
    }
     const productData =  {
      ...payload,
      images: files, 
    }

    const { success, message, data } = await productService.updateProductService(id, productData) as UserSignInResponse
    res.status( StatusCodes.OK)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};


// deleteProductController
export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const { success, message, data } = await productService.deleteProductService(id) as UserSignInResponse
    res.status( StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
