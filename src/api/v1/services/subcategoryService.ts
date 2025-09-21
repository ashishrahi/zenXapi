import { ISubCategory } from "../types/ISubCategoryTypes";
import { subcategoryRepository } from "../repository/index";

// create Subcategory
export const createSubCategoryService = async (payload: ISubCategory) => {
  try {
    const uploadedImages: string[] = payload?.images?.map((img) => img.path);

    const subcategoryData: Partial<ISubCategory> = {
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      categoryId: payload.categoryId,
      images: uploadedImages,
    };

    const newSubCategory = await subcategoryRepository.createSubCategory(
      subcategoryData
    );

    return {
      status: true,
      message: "subcategory successfully created",
      data: newSubCategory,
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

// get subcategory
export const getSubCategoryService = async (payload: ISubCategory) => {
  try {
    const existingSubCategory =
      await subcategoryRepository.findAllSubCategories();
    const subcategoryList = existingSubCategory.map((subcategory) => ({
      id: subcategory._id,
      name: subcategory.name,
      slug: subcategory.slug,
      description: subcategory.description || "",
      images: subcategory.images || [],
      category: subcategory.categoryId?.slug,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
    }));

    return {
      status: true,
      message: "subcategory fetch successfully",
      data: subcategoryList,
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

// updated subcategory
export const updateSubCategoryService = async (
  id: string,
  payload: ISubCategory
) => {
  try {

    // Ensure images is an array of strings matching the schema
    let updatedImages: string[] = [];

    if (Array.isArray(payload.images) && payload.images.length > 0) {
      // Flatten each file object to just the path (string)
      updatedImages = payload.images.map((file: any) => file.path);
    }

    const subcategoryData: Partial<ISubCategory> = {
      ...payload,
      images: updatedImages, // now matches schema [String]
    };

    const updatedSubCategory = await subcategoryRepository.updateSubCategory(
      id,
      subcategoryData
    );

    if (!updatedSubCategory) {
      return { success: false, message: "SubCategory not found" };
    }

    return {
      success: true,
      message: "SubCategory updated successfully",
      data: updatedSubCategory,
    };
  } catch (error) {
    console.error("Error in updateSubCategoryService:", error);
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};


// deleted subcategory
export const deleteSubCategoryService = async (id: string) => {
  try {
    const deletedSubCategory = await subcategoryRepository.deletesubCategory(id);

    if (!deletedSubCategory) {
      return {
        success: false,
        message: "SubCategory not found",
      };
    }

    return {
      success: true,
      message: "SubCategory marked as deleted successfully",
      data: deletedSubCategory,
    };
  } catch (error) {
    console.error("Error in deleteSubCategoryService:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error occurred" };
  }
};
