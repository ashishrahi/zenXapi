import Gender from "../../../models/genderModel";
import { IGender } from "../types/genderTypes";

export const genderRepository = {
  // Create Gender
  createGender: async (payload: IGender) => {
    const newGender = new Gender(payload);
    const savedGender = await newGender.save();
    return savedGender;
  },

  // Find All Genders
  findAllGenders: async () => {
    return await Gender.find();
  },

  // Find Gender By ID
  findGenderById: async (id: string) => {
    return await Gender.findById(id);
  },

  // Find One Gender by filter
  findOneGender: async (filter: Partial<IGender>) => {
    return await Gender.findOne(filter).lean();
  },

  // Update Gender
  updateGender: async (id: string, payload: Partial<IGender>) => {
    const updatedGender = await Gender.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, 
    });
    return updatedGender;
  },

  // Delete Gender
  deleteGender: async (id: string) => {
      return await Gender.findByIdAndUpdate(
    id,
    { isActive: true, deletedAt: new Date() }, // mark as deleted
    { new: true } // return the updated document
  );
  },
};
