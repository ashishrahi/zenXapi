import { bannerRepository } from "../repository";
import { IBanners } from "../types/IBannersTypes";
import { MESSAGES } from "../../../message/messages";

// Create Banner
export const createBannersService = async (payload: IBanners) => {
  try {
    const createdBanner = await bannerRepository.createBanner(payload);
    return {
      success: true,
      message: MESSAGES.BANNER.CREATE_SUCCESS,
      data: createdBanner,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get All Banners
export const getBannersService = async () => {
  try {
    const banners = await bannerRepository.findAllBanner();
    return {
      success: true,
      message: MESSAGES.BANNER.FETCH_SUCCESS,
      data: banners,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Update Banner
export const updateBannersService = async (id: string, payload: IBanners) => {
  try {
    const updatedBanner = await bannerRepository.updateBanner(id, payload);
    if (!updatedBanner) {
      return { success: false, message: MESSAGES.BANNER.UPDATE_FAILED };
    }
    return { success: true, message: MESSAGES.BANNER.UPDATE_SUCCESS, data: updatedBanner };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete Banner
export const deleteBannersService = async (id: string) => {
  try {
    const deletedBanner = await bannerRepository.deleteBanner(id);
    if (!deletedBanner) {
      return { success: false, message: MESSAGES.BANNER.DELETE_FAILED };
    }
    return { success: true, message: MESSAGES.BANNER.DELETE_SUCCESS, data: deletedBanner };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
