import { categoryRepository } from "../repository/index";
import { MESSAGES } from "../../../message/messages";
import { ICategory } from "../types/ICategoryTypes";
import { ServiceResponse } from "../types/IServiceResponse";
export interface IImage {
  path?: string;
}

// Create Category
export const createCategoryService = async (
  payload: ICategory
): Promise<ServiceResponse<ICategory>> => {
  try {
    const uploadedImages: string[] = (payload?.images || [])
      .map((img) => {
        if (typeof img === "string") return img;
        if ("files" in img && img.files.length > 0) {
          return img.files[0].path; // multer file path
        }
        return null;
      })
      .filter((p): p is string => p !== null);

    const categoryData: Partial<ICategory> = {
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      images: uploadedImages,
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
  payload: Partial<ICategory> & {
    newImages?: { color?: string; files: Express.Multer.File[] }[];
  }
) => {
  try {
    // Transform images to match ICategory type
    let updatedImages: { files: Express.Multer.File[] }[] | undefined;

    if (Array.isArray(payload.images) && payload.images.length > 0) {
      // Convert string[] or newImages to { files: File[] }[]
      updatedImages = payload.images.map((img: any) => {
        if (typeof img === "string") {
          return { files: [] }; // placeholder, or handle string-to-File conversion if needed
        }
        return img; // if already { files: File[] }
      });
    }

    const categoryData: Partial<ICategory> = {
      ...payload,
      images: updatedImages,
    };

    const updatedCategory = await categoryRepository.updateCategory(
      id,
      categoryData
    );

    if (!updatedCategory) {
      return { status: false, message: MESSAGES.CATEGORY.FETCH_FAILED };
    }

    return {
      status: true,
      message: MESSAGES.CATEGORY.UPDATE_SUCCESS,
      data: updatedCategory,
    };
  } catch (error) {
    console.error("Service Error:", error);
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
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
