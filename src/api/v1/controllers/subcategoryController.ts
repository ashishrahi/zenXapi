import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { subcategoryService } from "../services/index";
import { ICreateSubCategoryPayload, IUpdateSubCategoryPayload } from "../types/ISubCategoryTypes";

// ---------------- Create SubCategory ----------------
export const createSubCategoryController = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;

    const payload: ICreateSubCategoryPayload = {
      ...req.body,
      images: files,
    };

    const result = await subcategoryService.createSubCategoryService(payload);

    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error });
  }
};

// ---------------- Get SubCategories ----------------
export const getSubCategoryController = async (req: Request, res: Response) => {
  try {
         const payload = {
      search: req.query.search as string | undefined,
      categoryId: req.query.categoryId as string | undefined,
      isActive: req.query.isActive as string | undefined,
      limit: req.query.limit ? Number(req.query.limit) : 10,       // default 10
      page: req.query.page ? Number(req.query.page) : 1,          // default 1
      sort: req.query.sort as string | undefined,
      cursor: req.query.cursor as string | undefined,
    };
    const result = await subcategoryService.getSubCategoryService(payload);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error });
  }
};

// getSubCategorybyIdController

export const getSubCategorybyIdController = async (req: Request, res: Response) => {
  try {
        const {id} = req.params;
    const result = await subcategoryService.getSubCategorybyIdService(id);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error });
  }
};

// ---------------- Update SubCategory ----------------
export const updateSubCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Subcategory ID is required" });
    }

    // Parse existingImages from the text field (not from files)
    let existingImages: string[] = [];
    if (req.body.existingImages) {
      try {
        existingImages = typeof req.body.existingImages === 'string' 
          ? JSON.parse(req.body.existingImages) 
          : req.body.existingImages || [];
      } catch (parseError) {
        console.error("Error parsing existingImages:", parseError);
        existingImages = [];
      }
    }

    // Get new uploaded files from multer
    const files = req.files as Express.Multer.File[] | undefined;

    console.log('Backend received:');
    console.log('Existing images:', existingImages);
    console.log('New files count:', files?.length || 0);
    console.log('Other fields:', {
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      categoryId: req.body.categoryId
    });

    // Merge existing URLs with new files
    const allImages: (string | Express.Multer.File)[] = [
      ...existingImages,
      ...(files || []),
    ];

    // Create payload with proper typing
    const payload: IUpdateSubCategoryPayload = {
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      categoryId: req.body.categoryId,
      images: allImages,
      existingImages: existingImages
    };

    const result = await subcategoryService.updateSubCategoryService(id, payload);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error });
  }
};

// ---------------- Delete SubCategory ----------------
export const deleteSubCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await subcategoryService.deleteSubCategoryService(id);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error });
  }
};