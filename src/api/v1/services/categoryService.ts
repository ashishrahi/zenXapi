import { categoryRepository } from "../repository/index";
import { MESSAGES } from "../../../message/messages";
import { ICategory } from "../types/ICategoryTypes";
import { ServiceResponse } from "../types/IServiceResponse";
import { uploadToCloudinary } from "../../../middleware/upload";
import slugify from "slugify";

// ---------------- Helper: Upload images ----------------
const handleImageUpload = async (files?: Express.Multer.File[]): Promise<string[]> => {
  if (!files || files.length === 0) return [];
  return await uploadToCloudinary(files, "categories");
};

// ---------------- Create Category ----------------
export const createCategoryService = async (
  payload: ICategory & { images?: Express.Multer.File[] }
): Promise<ServiceResponse<ICategory>> => {
  try {
    const uploadedImages = await handleImageUpload(payload.images);

    // Generate slug from category name
    const categorySlug = slugify(payload.name || "", { lower: true, strict: true });

    const categoryData: Partial<ICategory> = {
      name: payload.name,
      slug: categorySlug, // auto-generated slug
      description: payload.description,
      images: uploadedImages,
    };

    const newCategory = await categoryRepository.createCategory(categoryData);

    return {
      success: true,
      message: MESSAGES.CATEGORY.CREATE_SUCCESS,
      data: newCategory,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: "Failed to create category",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// ---------------- Get Categories ----------------
export const getCategoryService = async (): Promise<ServiceResponse<ICategory[]>> => {
  try {
    const existingCategories = await categoryRepository.findAllCategories();

    if (!existingCategories || existingCategories.length === 0) {
      return {
        success: true,
        message: MESSAGES.CATEGORY.FETCH_FAILED,
        data: [],
      };
    }

    const categoriesWithUrls = existingCategories.map((category) => {
      const categoryObj = category.toObject ? category.toObject() : category;
      const imagesArray = Array.isArray(categoryObj.images) ? categoryObj.images : [];
      return {
        ...categoryObj,
        images: imagesArray.map((img: string) => (typeof img === "string" ? img : "")),
      };
    });

    return {
      success: true,
      message: MESSAGES.CATEGORY.FETCH_SUCCESS,
      data: categoriesWithUrls,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: "Failed to fetch categories",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// ---------------- Update Category ----------------
export const updateCategoryService = async (
  id: string,
  payload: Partial<ICategory> & { images?: (string | Express.Multer.File)[] }
): Promise<ServiceResponse<ICategory>> => {
  try {
    const existingCategory = await categoryRepository.findCategoryById(id);
    if (!existingCategory) {
      return {
        success: false,
        message: `Category with ID ${id} not found`,
      };
    }

    // Separate existing URLs from new files
    const filesToUpload = payload.images?.filter(img => typeof img !== "string") as Express.Multer.File[] || [];
    const existingUrls = payload.images?.filter(img => typeof img === "string") as string[] || [];


    // Upload new files
    const uploadedImages = filesToUpload.length > 0 ? await handleImageUpload(filesToUpload) : [];

    // Combine existing URLs with newly uploaded images
    const finalImages = [...existingUrls, ...uploadedImages];


    // Allow updating even if some fields are empty strings
    const categoryData: Partial<ICategory> = {
      ...(payload.name !== undefined ? { name: payload.name } : {}),
      ...(payload.slug !== undefined ? { slug: payload.slug } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(finalImages.length > 0 ? { images: finalImages } : {}),
    };


    if (Object.keys(categoryData).length === 0) {
      return {
        success: false,
        message: "No valid fields to update",
      };
    }

    const updatedCategory = await categoryRepository.updateCategory(id, categoryData);

    return {
      success: true,
      message: "Category updated successfully",
      data: updatedCategory || undefined,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: "Failed to update category",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};


// ---------------- Delete Category ----------------
export const deleteCategoryService = async (
  id: string
): Promise<ServiceResponse<null>> => {
  try {
    const existingCategory = await categoryRepository.findCategoryById(id);
    if (!existingCategory) {
      return {
        success: false,
        message: MESSAGES.CATEGORY.DELETE_FAILED,
      };
    }

    const deleteResult = await categoryRepository.deleteCategory(id);

    return {
      success: true,
      message: deleteResult ? MESSAGES.CATEGORY.DELETE_SUCCESS : MESSAGES.CATEGORY.DELETE_FAILED,
      data: null,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: "Failed to delete category",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
