import {signUpUser, signInUser} from '../controllers/userController'
import {createCategoryController, getCategoryController,
   updateCategoryController, deleteCategoryController 
} from '../controllers/categoryController'

import {createSubCategoryController, getSubCategoryController,
   updateSubCategoryController, deleteSubCategoryController 
} from '../controllers/subcategoryController'

import {createGenderController,getGenderController,updateGenderController,deleteGenderController }
from '../controllers/genderController'
import {createSizeController,getSizeController,updateSizeController,deleteSizeController }
from '../controllers/sizeController'


// user
export const userController = {
    signInUser: signInUser,
    signUpUser :signUpUser
}

// category
export const categoryController = {
    createCategoryController: createCategoryController,
    getCategoryController: getCategoryController,
    updateCategoryController : updateCategoryController,
    deleteCategoryController : deleteCategoryController,
}


// subcategory
export const subcategoryController = {
    createSubCategoryController: createSubCategoryController,
    getSubCategoryController: getSubCategoryController,
    updateSubCategoryController : updateSubCategoryController,
    deleteSubCategoryController : deleteSubCategoryController,
}


// gender

export const genderController = {
    createGenderController: createGenderController,
    getGenderController: getGenderController,
    updateGenderController : updateGenderController,
    deleteGenderController : deleteGenderController,
}

// size

export const sizeController = {
    createSizeController: createSizeController,
    getSizeController: getSizeController,
    updateSizeController : updateSizeController,
    deleteSizeController : deleteSizeController,
}
