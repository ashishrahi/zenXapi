import {
  ISubCategory,
  ICreateSubCategoryPayload,
  IUpdateSubCategoryPayload,
} from "../types/ISubCategoryTypes";
import { subcategoryRepository } from "../repository/index";
import { uploadToCloudinary } from "../../../middleware/upload";
import { Types } from "mongoose";
import slugify from "slugify";
import { MESSAGES } from "../../../message/messages";
import { ISubCategoryQuery } from "../types/ISubCategoryTypes";

// Helper: Upload images to Cloudinary
const handleImageUpload = async (
  files: Express.Multer.File[]
): Promise<string[]> => {
  if (!files || files.length === 0) return [];
  return await uploadToCloudinary(files, "subcategories");
};

// Helper: Filter files from mixed array with proper type guard
const filterFiles = (
  images: (string | Express.Multer.File)[] | undefined
): Express.Multer.File[] => {
  if (!images) return [];

  return images.filter((img): img is Express.Multer.File => {
    return img instanceof Object && "fieldname" in img && "originalname" in img;
  });
};

// Helper: Filter strings from mixed array with proper type guard
const filterStrings = (
  images: (string | Express.Multer.File)[] | undefined
): string[] => {
  if (!images) return [];

  return images.filter((img): img is string => {
    return typeof img === "string";
  });
};

// ---------------- Create SubCategory ----------------

export const createSubCategoryService = async (
  payload: ICreateSubCategoryPayload
) => {
  try {
    const uploadedImages = await handleImageUpload(payload.images || []);

    const subcategoryData: Partial<ISubCategory> = {
      name: payload.name,
      slug: slugify(payload.name || "", { lower: true, strict: true }),
      description: payload.description,
      categoryId: payload.categoryId
        ? new Types.ObjectId(payload.categoryId)
        : undefined,
      images: uploadedImages,
    };

    const newSubCategory = await subcategoryRepository.createSubCategory(
      subcategoryData
    );

    return {
      success: true,
      message: MESSAGES.SUBCATEGORY.CREATE_SUCCESS,
      data: newSubCategory,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: "Failed to create SubCategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// ---------------- Get SubCategories ----------------
export const getSubCategoryService = async (payload: ISubCategoryQuery) => {
  try {
    const result = await subcategoryRepository.findAllSubCategories(payload);
    const subcategories = result.data; // cursor version: data array
    const nextCursor = result.nextCursor;

    const subcategoryList = subcategories.map((subcategory: any) => {
      const category = subcategory.category as { slug: string } | null;
      return {
        _id: subcategory._id,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description || "",
        images: subcategory.images || [],
        categoryId: subcategory.categoryId,
        category: category?.slug || "",
        createdAt: subcategory.createdAt,
        updatedAt: subcategory.updatedAt,
      };
    });

    return {
      success: true,
      message: "SubCategories fetched successfully",
      data: subcategoryList,
      nextCursor
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: "Failed to fetch SubCategories",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// getSubCategorybyIdService

export const getSubCategorybyIdService = async (id: string) => {
  try {
    const existingSubCategories =
      await subcategoryRepository.findSubCategoryById(id);

    return {
      success: true,
      message: MESSAGES.SUBCATEGORY.FETCH_SUCCESS,
      data: existingSubCategories,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: "Failed to fetch SubCategories",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// ---------------- Update SubCategory ----------------
export const updateSubCategoryService = async (
  id: string,
  payload: IUpdateSubCategoryPayload
) => {
  try {
    // First, get the current subcategory to preserve existing images
    const existingSubCategory = await subcategoryRepository.findSubCategoryById(
      id
    );
    if (!existingSubCategory) {
      return { success: false, message: "SubCategory not found" };
    }

    // Get current images from database
    const currentImagesInDB = existingSubCategory.images || [];

    // Use existingImages from payload if provided, otherwise use all current DB images
    const existingUrlsFromRequest = payload.existingImages || currentImagesInDB;

    // Separate new files from the images array using proper type guards
    const filesToUpload = filterFiles(payload.images);

    // Upload new files
    const uploadedImages =
      filesToUpload.length > 0 ? await handleImageUpload(filesToUpload) : [];

    // Final images = images user wants to keep + new uploaded images
    const finalImages = [...existingUrlsFromRequest, ...uploadedImages];

    const subcategoryData: Partial<ISubCategory> = {
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      categoryId: payload.categoryId
        ? new Types.ObjectId(payload.categoryId)
        : undefined,
      images: finalImages,
    };

    const updatedSubCategory = await subcategoryRepository.updateSubCategory(
      id,
      subcategoryData
    );

    return {
      success: true,
      message: MESSAGES.SUBCATEGORY.UPDATE_SUCCESS,
      data: updatedSubCategory,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: "Failed to update SubCategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// ---------------- Delete SubCategory ----------------
export const deleteSubCategoryService = async (id: string) => {
  try {
    const deletedSubCategory = await subcategoryRepository.deletesubCategory(
      id
    );

    if (!deletedSubCategory) {
      return { success: false, message: "SubCategory not found" };
    }

    return {
      success: true,
      message: MESSAGES.SUBCATEGORY.DELETE_SUCCESS,
      data: deletedSubCategory,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: "Failed to delete SubCategory",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
