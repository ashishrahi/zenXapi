import Category from "../../../models/categoryModel";
import {SubCategory} from "../../../models/subcategoryModel";
import {ISubCategory } from "../types/ISubCategoryTypes";

export const subcategoryRepository = {
  // Create 
  createSubCategory: async (payload: ISubCategory) => {
    const newSubCategory = new SubCategory(payload);
    const savedSubCategory = await newSubCategory.save();
    return savedSubCategory;
  },

  // Find All SubCategories
  findAllSubCategories: async () => {
    return await SubCategory.find()
    .populate({ path: "categoryId", select: "slug" }) // only slug field
    .lean();
  },

  // Find SubCategory By ID
  findSubCategoryById: async (id: string) => {
    return await SubCategory.findById(id);
  },

  // Find One SubCategory by filter
  findOneSubCategory: async (filter: Partial<ISubCategory>) => {
    return await SubCategory.findOne(filter);
  },

  // Update SubCategory
  updateSubCategory: async (id: string, payload: Partial<ISubCategory>) => {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedSubCategory;
  },

  // Delete SubCategory
 deletesubCategory: async (id: string) => {
  return await SubCategory.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true } // return the updated document
  );
}
};
