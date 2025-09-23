import {getUserService, updateUserService, deleteUserService} from '../services/userService'
import { createCategoryService, getCategoryService, updateCategoryService, deleteCategoryService } from '../services/categoryService'
import { createProductService, getProductService, updateProductService, deleteProductService, getProductbyIdService } from '../services/productService'

import { createSubCategoryService, getSubCategoryService, updateSubCategoryService, deleteSubCategoryService } from '../services/subcategoryService'

import { createGenderService, getGenderService, updateGenderService, deleteGenderService } from '../services/genderService'
import { createSizeService, getSizeService, updateSizeService, deleteSizeService } from '../services/sizeService'
import { createColorService, getColorService, updateColorService, deleteColorService } from '../services/colorService'
import { createFaqService, getFaqService, updateFaqService, deleteFaqService } from '../services/faqService'
import { createExportService, getExportService, updateExportService, deleteExportService } from '../services/exportService'
import { createTagService, getTagService, updateTagService, deleteTagService } from '../services/tagService'
import { createBannersService, getBannersService, updateBannersService, deleteBannersService } from '../services/bannerService'
import { 
  createOrderService, 
  getOrdersService, 
  updateOrderService, 
  deleteOrderService 
} from './ordersService';
import {registerService, loginService, refreshService} from '../services/authService'


 import {createContactService,
  getContactsService,
  updateContactService,
  deleteContactService} from './contactService'


// auth
export const authService = {
    registerService : registerService,
    loginService : loginService,
    refreshService : refreshService
}



// user
export const userService = {
    getUserService : getUserService,
    updateUserService : updateUserService,
    deleteUserService : deleteUserService
}

// category

export const categoryService = {
    createCategoryService: createCategoryService,
    getCategoryService: getCategoryService,
    updateCategoryService: updateCategoryService,
    deleteCategoryService: deleteCategoryService
}

// subcategory

export const subcategoryService = {
    createSubCategoryService: createSubCategoryService,
    getSubCategoryService: getSubCategoryService,
    updateSubCategoryService: updateSubCategoryService,
    deleteSubCategoryService: deleteSubCategoryService
}



// product

export const productService = {
    createProductService: createProductService,
    getProductService: getProductService,
    updateProductService: updateProductService,
    deleteProductService: deleteProductService,
    getProductbyIdService : getProductbyIdService
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

export const colorService = {
    createColorService: createColorService,
    getColorService: getColorService,
    updateColorService: updateColorService,
    deleteColorService: deleteColorService
}



export const faqService = {
    createFaqService: createFaqService,
    getFaqService: getFaqService,
    updateFaqService: updateFaqService,
    deleteFaqService: deleteFaqService
}



export const exportService = {
    createExportService: createExportService,
    getExportService: getExportService,
    updateExportService: updateExportService,
    deleteExportService: deleteExportService
}

export const tagService = {
    createTagService: createTagService,
    getTagService: getTagService,
    updateTagService: updateTagService,
    deleteTagService: deleteTagService
}

export const bannerService = {
    createBannersService: createBannersService,
    getBannersService: getBannersService,
    updateBannersService: updateBannersService,
    deleteBannersService: deleteBannersService
}

export const orderService = {
  createOrderService,
  getOrdersService,
  updateOrderService,
  deleteOrderService,
};

export const contactService = {
  createContactService,
  getContactsService,
  updateContactService,
  deleteContactService,
};