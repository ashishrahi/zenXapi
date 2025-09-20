import Banners from "../../../models/bannersModel";
import { IBanners } from "../types/IBannersTypes";

export const bannerRepository = {
  // Create banner
  createBanner: async (payload: IBanners) => {
    const newBanner = new Banners(payload);
    const savedBanner = newBanner.save();
    return savedBanner;
  },

  // Find All Banners
  findAllBanner: async () => {
    return await Banners.find();
  },

  // Find Banner By ID
  findBannerById: async (id: string) => {
    return await Banners.findById(id);
  },

  // Find One Banner by filter
  findOneBanner: async (filter: Partial<IBanners>) => {
    return await Banners.findOne(filter);
  },

  // Update Banner
  updateBanner: async (id: string, payload: Partial<IBanners>) => {
    const updatedBanner = await Banners.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedBanner;
  },

  // Delete Tag
  deleteBanner: async (id: string) => {
    return await Banners.findByIdAndDelete(id);
  },
};
