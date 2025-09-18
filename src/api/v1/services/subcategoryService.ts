import { ISubCategory } from '../types/ISubCategoryTypes';
import {subcategoryRepository} from '../repository/index'


// create Subcategory
export const createSubCategoryService = async(payload:ISubCategory) =>{
try {
    const existingSubCategory = await subcategoryRepository.createSubCategory(payload)
    
    return{
        status: true,
        message: "subcategory successfully created",
        data: existingSubCategory
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}




// get subcategory
export const getSubCategoryService = async(payload:ISubCategory) =>{
try {
    const existingSubCategory = await subcategoryRepository.findAllSubCategories()

    
    return{
        status: true,
        message: "user signup successfully",
        data:existingSubCategory
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}

// updated subcategory
export const updateSubCategoryService = async(id:string , payload:ISubCategory) =>{
try {
    const existingSubCategory = await subcategoryRepository.updateSubCategory(id, payload)

        return {
          success: false,
          message: "SubCategory already exists",
          data: existingSubCategory
        };
    
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}

// deleted subcategory
export const deleteSubCategoryService = async(id:string ) =>{
try {
    const existingSubCategory = await subcategoryRepository.deletesubCategory(id)
   if (existingSubCategory) {
    return{
        status: true,
        message: "subcategory deleted successfully",
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




