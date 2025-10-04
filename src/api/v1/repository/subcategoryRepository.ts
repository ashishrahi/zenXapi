import {SubCategory} from "../../../models/subcategoryModel";
import { buildSubCategoryPipeline } from "../pipelines/subcategoryPipeline";
import {ISubCategory, ISubCategoryQuery } from "../types/ISubCategoryTypes";



export const subcategoryRepository = {
  // Create 
  createSubCategory: async (payload: ISubCategory) => {
    const newSubCategory = new SubCategory(payload);
    const savedSubCategory = await newSubCategory.save();
    return savedSubCategory;
  },

  // Find All SubCategories
findAllSubCategories: async (payload: ISubCategoryQuery) => {
  const pipeline = buildSubCategoryPipeline(payload);
  const subcategories = await SubCategory.aggregate(pipeline);

  let nextCursor: string | null = null;
  let data = subcategories;

  if (subcategories.length > (payload.limit || 10)) {
    const last = subcategories.pop();
    nextCursor = last._id.toString();
    data = subcategories;
  }

  return { data, nextCursor };
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
