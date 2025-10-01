  import {
  getUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController";
import {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController";

import {
  createSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
} from "../controllers/subcategoryController";

import {
  createProductController,
  getProductController,
  updateProductController,
  deleteProductController,
  getProductBySlugController,
  getProductsByCollectionSlugController
} from "../controllers/productController";

import {
  createGenderController,
  getGenderController,
  updateGenderController,
  deleteGenderController,
} from "../controllers/genderController";
import {
  createSizeController,
  getSizeController,
  updateSizeController,
  deleteSizeController,
} from "../controllers/sizeController";
import {
  createColorController,
  getColorController,
  updateColorController,
  deleteColorController,
} from "../controllers/colorController";
import {
  createFaqController,
  getFaqController,
  updateFaqController,
  deleteFaqController,
} from "../controllers/faqController";
import {
  createExportController,
  getExportController,
  updateExportController,
  deleteExportController,
} from "../controllers/exportController";
import {
  createTagController,
  getTagController,
  updateTagController,
  deleteTagController,
} from "../controllers/tagController";
import {
  createBannersController,
  getBannersController,
  updateBannersController,
  deleteBannersController,
} from "../controllers/bannersController";
import {
  registerController,
  loginController,
  refreshTokenController,
  logoutController
} from "../controllers/authController";

import {
  createOrderController,
  getOrdersController,
  updateOrderController,
  deleteOrderController,
} from "../controllers/ordersController";

import {
  createContactController,
  getContactsController,
  updateContactController,
  deleteContactController,
} from "../controllers/contactController";

import {
  createEnquireController,
  getEnquireController,
  updateEnquireController,
  deleteEnquireController,
} from "../controllers/enquireController";

import {
  createBlogController,
  getBlogController,
  getBlogbyIdController,
  updateBlogController,
  deleteBlogController,
} from "../controllers/blogController";

import {
  createCountryController,
  getCountryController,
  updateCountryController,
  deleteCountryController,
} from "../controllers/countryController";

import { getDashboardController } from "../controllers/dashboardController";

import { createStateController, getStateController, updateStateController, deleteStateController } from "../controllers/stateController";
import { createCityController, getCityController, updateCityController, deleteCityController } from "../controllers/cityController";

// user
export const userController = {
  getUserController: getUserController,
  updateUserController: updateUserController,
  deleteUserController: deleteUserController,
};

// category
export const categoryController = {
  createCategoryController: createCategoryController,
  getCategoryController: getCategoryController,
  updateCategoryController: updateCategoryController,
  deleteCategoryController: deleteCategoryController,
};

// subcategory
export const subcategoryController = {
  createSubCategoryController: createSubCategoryController,
  getSubCategoryController: getSubCategoryController,
  updateSubCategoryController: updateSubCategoryController,
  deleteSubCategoryController: deleteSubCategoryController,
};

// product
export const productController = {
  createProductController: createProductController,
  getProductController: getProductController,
  updateProductController: updateProductController,
  deleteProductController: deleteProductController,
  getProductBySlugController: getProductBySlugController,
  getProductsByCollectionSlugController: getProductsByCollectionSlugController
};

// gender

export const genderController = {
  createGenderController: createGenderController,
  getGenderController: getGenderController,
  updateGenderController: updateGenderController,
  deleteGenderController: deleteGenderController,
};

// size

export const sizeController = {
  createSizeController: createSizeController,
  getSizeController: getSizeController,
  updateSizeController: updateSizeController,
  deleteSizeController: deleteSizeController,
};

export const colorsController = {
  createColorController: createColorController,
  getColorController: getColorController,
  updateColorController: updateColorController,
  deleteColorController: deleteColorController,
};

export const faqController = {
  createFaqController: createFaqController,
  getFaqController: getFaqController,
  updateFaqController: updateFaqController,
  deleteFaqController: deleteFaqController,
};

export const exportController = {
  createExportController: createExportController,
  getExportController: getExportController,
  updateExportController: updateExportController,
  deleteExportController: deleteExportController,
};

export const tagController = {
  createTagController: createTagController,
  getTagController: getTagController,
  updateTagController: updateTagController,
  deleteTagController: deleteTagController,
};

export const bannersController = {
  createBannersController: createBannersController,
  getBannersController: getBannersController,
  updateBannersController: updateBannersController,
  deleteBannersController: deleteBannersController,
};

export const ordersController = {
  createOrder: createOrderController,
  getOrders: getOrdersController,
  updateOrder: updateOrderController,
  deleteOrder: deleteOrderController,
};

export const contactController = {
  createContact: createContactController,
  getContacts: getContactsController,
  updateContact: updateContactController,
  deleteContact: deleteContactController,
};

export const authController = {
  registerController: registerController,
  loginController: loginController,
  refreshTokenController : refreshTokenController,
  logoutController :logoutController

};

export const enquireController = {
  createEnquireController: createEnquireController,
  getEnquireController: getEnquireController,
  updateEnquireController: updateEnquireController,
  deleteEnquireController: deleteEnquireController,
};

export const blogController = {
  createBlogController: createBlogController,
  getBlogController: getBlogController,
  updateBlogController: updateBlogController,
  deleteBlogController: deleteBlogController,
  getBlogbyIdController: getBlogbyIdController,
};

export const dashboardController = {
  getDashboardController: getDashboardController,
};

export const countryController = {
  createCountryController: createCountryController,
  getCountryController: getCountryController,
  updateCountryController: updateCountryController,
  deleteCountryController: deleteCountryController,
};

export const stateController = {
  createStateController: createStateController,
  getStateController: getStateController,
  updateStateController: updateStateController,
  deleteStateController: deleteStateController,
};

export const cityController = {
  createCityController: createCityController,
  getCityController: getCityController,
  updateCityController: updateCityController,
  deleteCityController: deleteCityController,
};
