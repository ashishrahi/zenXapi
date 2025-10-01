import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { productService } from "../services/index";
import { ProductResponse } from "../types/productResponse"; 
import { AuthRequest } from "../../../middleware/authMiddleware";


// ---------------- CREATE PRODUCT ----------------
export const createProductController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const files = req.files as Express.Multer.File[]; // Multer files
    

    const { success, message, data } = await productService.createProductService(
      payload,
      files
    ) as ProductResponse;

    res.status(StatusCodes.CREATED).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating product", error });
  }
};

// ---------------- GET ALL PRODUCTS ----------------
export const getProductController = async (req: Request, res: Response) => {
  try {
   

    const { success, message, data } = await productService.getProductService() as ProductResponse;

    

    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error fetching products", error });
  }
};

// ---------------- GET PRODUCT BY SLUG ----------------
export const getProductBySlugController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { success, message, data } = await productService.getProductbySlugService(slug) as ProductResponse;
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error fetching product", error });
  }
};


export const getProductsByCollectionSlugController = async (req:Request, res:Response) => {
  try {
    const { slug } = req.params;

  const { success, message, data } = await productService.getProductCollectionSlugService(slug) as ProductResponse;
    res.status(StatusCodes.OK).json({success, message, data});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};



// ---------------- UPDATE PRODUCT ----------------
export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Product ID is required" });

    const payload = req.body;
    const files = req.files as Express.Multer.File[];

  
  
    const { success, message, data } = await productService.updateProductService(id,payload,files) as ProductResponse;
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error updating product", error });
  }
};

// ---------------- DELETE PRODUCT ----------------
export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { success, message, data } = await productService.deleteProductService(id) as ProductResponse;
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error deleting product", error });
  }
};
