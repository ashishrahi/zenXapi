import Category from "../../../models/categoryModel";
import { ICategory } from "../types/ICategoryTypes";

export const categoryRepository = {
  // Create 
  createCategory: async (payload: ICategory) => {
    const newCategory = new Category(payload);
    const savedCategory = await newCategory.save();
    return savedCategory;
  },

  // Find All Categories
  findAllCategories: async () => {
    return await Category.find();
  },

  // Find Category By ID
  findCategoryById: async (id: string) => {
    return await Category.findById(id);
  },

  // Find One Category by filter
  findOneCategory: async (filter: Partial<ICategory>) => {
    return await Category.findOne(filter);
  },

  // Update Category
  updateCategory: async (id: string, payload: Partial<ICategory>) => {
    const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedCategory;
  },

  // Delete Category
  deleteCategory: async (id: string) => {
    return await Category.findByIdAndDelete(id);
  },
};
