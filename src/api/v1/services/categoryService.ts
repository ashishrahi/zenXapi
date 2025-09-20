import { ICategory } from "../types/ICategoryTypes";
import { categoryRepository } from "../repository/index";
import { Types } from "mongoose";
import { ISubCategory } from "../types/ISubCategoryTypes";
import { MESSAGES } from "../../../message/messages";
interface ServiceResponse<T> {
  status: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface IImage {
  color: string;
  images: string[];
}

interface ICreateCategoryPayload {
  name: string;
  slug: string;
  gender: Types.ObjectId;
  description?: string;
  images: {
    color: string;
    files: Express.Multer.File[];
  }[];
}

// create category
interface ServiceResponse<T> {
  status: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface IImage {
  color: string;
  images: string[];
}

interface ICreateCategoryPayload {
  name: string;
  slug: string;
  gender: Types.ObjectId;
  description?: string;
  images: {
    files: Express.Multer.File[];
  }[];
}

// Create Category
export const createCategoryService = async (
  payload: ICreateCategoryPayload
): Promise<ServiceResponse<ICategory>> => {
  try {

    const uploadedImages: string[] = payload?.images?.map((img) => img.path);

    const categoryData: Partial<ICategory> = {
      name: payload.name,
      slug: payload.slug,
      gender: payload.gender,
      description: payload.description,
      images: uploadedImages, // just the array of URLs
    };

    const newCategory = await categoryRepository.createCategory(categoryData);

    return {
      status: true,
      message: MESSAGES.CATEGORY.CREATE_SUCCESS,
      data: newCategory,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      status: false,
      message: "Failed to create category",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};


// get category
export const getCategoryService = async (payload: ICategory) => {
  try {
    const existingCategory = await categoryRepository.findAllCategories();

    return {
      status: true,
      message: MESSAGES.CATEGORY.FETCH_SUCCESS,
      data: existingCategory,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

// signInService
export const updateCategoryService = async (
  id: string,
  payload: Partial<ICategory> & { newImages?: { color: string; files: Express.Multer.File[] }[] }
): Promise<ServiceResponse<ICategory>> => {
  try {

    // Ensure images is an array of strings matching the schema
    let updatedImages: string[] = [];

    if (Array.isArray(payload.images) && payload.images.length > 0) {
      // Flatten each file object to just the path (string)
      updatedImages = payload.images.map((file: any) => file.path);
    }

    const categoryData: Partial<ISubCategory> = {
      ...payload,
      images: updatedImages, // now matches schema [String]
    };
    const updatedCategory = await categoryRepository.updateCategory(id, categoryData);

    if (!updatedCategory) {
      return { status: false, message: MESSAGES.CATEGORY.FETCH_FAILED };
    }

    return { status: true, message: MESSAGES.CATEGORY.UPDATE_SUCCESS ,data: updatedCategory};
  } catch (error) {
    console.error("Service Error:", error);
    return { status: false, message: "Failed to update category", error: error instanceof Error ? error.message : "Unknown error" };
  }
};


// delete category
export const deleteCategoryService = async (id: string) => {
  try {
    const existingCategory = await categoryRepository.deleteCategory(id);
    if (existingCategory) {
      return {
        status: true,
        message: MESSAGES.CATEGORY.DELETE_SUCCESS,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
