import {userSignInService, userSignUpService} from '../services/userService'
import { createCategoryService, getCategoryService, updateCategoryService, deleteCategoryService } from '../services/categoryService'
import { createSubCategoryService, getSubCategoryService, updateSubCategoryService, deleteSubCategoryService } from '../services/subcategoryService'

import { createGenderService, getGenderService, updateGenderService, deleteGenderService } from '../services/genderService'
import { createSizeService, getSizeService, updateSizeService, deleteSizeService } from '../services/sizeService'

// user
export const userService = {
    userSignInService : userSignInService,
    userSignUpService : userSignUpService
}

// category

export const categoryService = {
    createCategoryService: createCategoryService,
    getCategoryService: getCategoryService,
    updateCategoryService: updateCategoryService,
    deleteCategoryService: deleteCategoryService
}

// category

export const subcategoryService = {
    createSubCategoryService: createSubCategoryService,
    getSubCategoryService: getSubCategoryService,
    updateSubCategoryService: updateSubCategoryService,
    deleteSubCategoryService: deleteSubCategoryService
}

// gender

export const genderService = {
    createGenderService: createGenderService,
    getGenderService: getGenderService,
    updateGenderService: updateGenderService,
    deleteGenderService: deleteGenderService
}


// size

export const sizeService = {
    createSizeService: createSizeService,
    getSizeService: getSizeService,
    updateSizeService: updateSizeService,
    deleteSizeService: deleteSizeService
}