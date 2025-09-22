import { ISubCategory } from "../types/ISubCategoryTypes";
import { subcategoryRepository } from "../repository/index";
import { uploadToCloudinary } from "../../../middleware/upload"; // Multer+Cloudinary helper

// Helper: Upload images to Cloudinary
const handleImageUpload = async (files?: Express.Multer.File[]): Promise<string[]> => {
  if (!files || files.length === 0) return [];
  return await uploadToCloudinary(files, "subcategories");
};

// ---------------- Create SubCategory ----------------
export const createSubCategoryService = async (payload: ISubCategory & { images?: Express.Multer.File[] }) => {
  try {
    const uploadedImages = await handleImageUpload(payload.images);

    const subcategoryData: Partial<ISubCategory> = {
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      categoryId: payload.categoryId,
      images: uploadedImages,
    };

    const newSubCategory = await subcategoryRepository.createSubCategory(subcategoryData);

    return { success: true, message: "SubCategory created successfully", data: newSubCategory };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: "Failed to create SubCategory", error: error instanceof Error ? error.message : "Unknown error" };
  }
};

// ---------------- Get SubCategories ----------------
export const getSubCategoryService = async () => {
  try {
    const existingSubCategories = await subcategoryRepository.findAllSubCategories();

    const subcategoryList = existingSubCategories.map((subcategory) => {
      const category = subcategory.categoryId as unknown as { slug: string } | null;
      return {
        _id: subcategory._id,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description || "",
        images: subcategory.images || [],
        categoryId: subcategory.categoryId._id,
        category: category?.slug || "",
        createdAt: subcategory.createdAt,
        updatedAt: subcategory.updatedAt,
      };
    });

    return { success: true, message: "SubCategories fetched successfully", data: subcategoryList };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: "Failed to fetch SubCategories", error: error instanceof Error ? error.message : "Unknown error" };
  }
};

// ---------------- Update SubCategory ----------------
export const updateSubCategoryService = async (id: string, payload: Partial<ISubCategory> & { images?: Express.Multer.File[] }) => {
  try {
    const uploadedImages = await handleImageUpload(payload.images);

    const subcategoryData: Partial<ISubCategory> = {
      ...(payload.name !== undefined ? { name: payload.name } : {}),
      ...(payload.slug !== undefined ? { slug: payload.slug } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.categoryId !== undefined ? { categoryId: payload.categoryId } : {}),
      ...(uploadedImages.length > 0 ? { images: uploadedImages } : {}),
    };

    const updatedSubCategory = await subcategoryRepository.updateSubCategory(id, subcategoryData);

    if (!updatedSubCategory) {
      return { success: false, message: "SubCategory not found" };
    }

    return { success: true, message: "SubCategory updated successfully", data: updatedSubCategory };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: "Failed to update SubCategory", error: error instanceof Error ? error.message : "Unknown error" };
  }
};

// ---------------- Delete SubCategory ----------------
export const deleteSubCategoryService = async (id: string) => {
  try {
    const deletedSubCategory = await subcategoryRepository.deletesubCategory(id);

    if (!deletedSubCategory) {
      return { success: false, message: "SubCategory not found" };
    }

    return { success: true, message: "SubCategory deleted successfully", data: deletedSubCategory };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: "Failed to delete SubCategory", error: error instanceof Error ? error.message : "Unknown error" };
  }
};
