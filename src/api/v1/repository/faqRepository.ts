import FAQ from "../../../models/faqModel";
import { IFAQ } from "../types/IFAQTypes";

export const faqRepository = {
  // Create Faq
  createFaq: async (payload: IFAQ) => {
    const newFaq = new FAQ(payload);
    const savedFaq = await newFaq.save();
    return savedFaq;
  },

  // Find All faq
  findAllFaq: async () => {
    return await FAQ.find();
  },

  // Find Faq By ID
  findFaqById: async (id: string) => {
    return await FAQ.findById(id);
  },

  // Find One Faq by filter
  findOneFaq: async (filter: Partial<IFAQ>) => {
    return await FAQ.findOne(filter);
  },

  // Update Faq
  updateFaq: async (id: string, payload: Partial<IFAQ>) => {
    const updatedFaq = await FAQ.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedFaq;
  },

  // Delete faq
  deleteFaq: async (id: string) => {
      return await FAQ.findByIdAndUpdate(
    id,
    { isActive: true, deletedAt: new Date() }, // mark as deleted
    { new: true } // return the updated document
  );
  },
};
