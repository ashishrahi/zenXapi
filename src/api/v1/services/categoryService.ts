import { ICategory } from '../types/ICategoryTypes';
import {categoryRepository} from '../repository/index'


// create category
export const createCategoryService = async(payload:ICategory) =>{
try {
    const existingCategory = await categoryRepository.createCategory(payload)
    
    return{
        status: true,
        message: "category successfully created",
        data: existingCategory
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}




// get category
export const getCategoryService = async(payload:ICategory) =>{
try {
    const existingCategory = await categoryRepository.findAllCategories()

    
    return{
        status: true,
        message: "user signup successfully",
        data:existingCategory
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}

// signInService
export const updateCategoryService = async(id:string , payload:ICategory) =>{
try {
    const existingCategory = await categoryRepository.updateCategory(id, payload)

        return {
          success: false,
          message: "Category already exists",
        };
    
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}

// signInService
export const deleteCategoryService = async(id:string ) =>{
try {
    const existingCategory = await categoryRepository.deleteCategory(id)
   if (existingCategory) {
    return{
        status: true,
        message: "category deleted successfully",
    }
   }
     
    
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}




