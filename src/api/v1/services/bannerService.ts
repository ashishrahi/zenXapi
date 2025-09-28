import { bannerRepository } from "../repository";
import { IBanners } from "../types/IBannersTypes";
import { MESSAGES } from "../../../message/messages";
import { uploadToCloudinary } from "../../../middleware/upload";

// Helper to upload files
const handleImageUpload = async (files?: Express.Multer.File[]): Promise<string[]> => {
  if (!files || files.length === 0) return [];
  return await uploadToCloudinary(files, "banners");
};

// Create Banner
export const createBannersService = async (payload: IBanners & { images?: Express.Multer.File[] }) => {
  try {
    const uploadedImages = await handleImageUpload(payload.images);
    const bannerData: Partial<IBanners> = { ...payload, images: uploadedImages };
    const createdBanner = await bannerRepository.createBanner(bannerData as IBanners);
    return { success: true, message: MESSAGES.BANNER.CREATE_SUCCESS, data: createdBanner };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: MESSAGES.BANNER.CREATE_FAILED, error: error.message };
  }
};

// Update Banner
export const updateBannersService = async (
  id: string,
  payload: Partial<IBanners> & { images?: Express.Multer.File[], existingImages?: string[] }
) => {
  try {
    // Upload new files
    const uploadedImages = await handleImageUpload(payload.images);

    // Merge existing images with newly uploaded images
    const images = [
      ...(payload.existingImages || []), // old images to keep
      ...uploadedImages                    // newly uploaded images
    ];

    const bannerData: Partial<IBanners> = { ...payload, images };
    const updatedBanner = await bannerRepository.updateBanner(id, bannerData);

    if (!updatedBanner) return { success: false, message: MESSAGES.BANNER.UPDATE_FAILED };

    return { success: true, message: MESSAGES.BANNER.UPDATE_SUCCESS, data: updatedBanner };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: MESSAGES.BANNER.UPDATE_FAILED, error: error.message };
  }
};

// Get All Banners
export const getBannersService = async () => {
  try {
    const banners = await bannerRepository.findAllBanner();
    return { success: true, message: MESSAGES.BANNER.FETCH_SUCCESS, data: banners };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: MESSAGES.BANNER.FETCH_FAILED, error: error.message };
  }
};

// Delete Banner
export const deleteBannersService = async (id: string) => {
  try {
    const deletedBanner = await bannerRepository.deleteBanner(id);
    if (!deletedBanner) return { success: false, message: MESSAGES.BANNER.DELETE_FAILED };
    return { success: true, message: MESSAGES.BANNER.DELETE_SUCCESS, data: deletedBanner };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: MESSAGES.BANNER.DELETE_FAILED, error: error.message };
  }
};
