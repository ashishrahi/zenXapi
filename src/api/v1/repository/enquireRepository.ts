import { EnquireInfoModel } from "../../../models/equireModel";
import { IEnquire } from "../types/enquireTypes";

export const enquireRepository = {
  // Create Enquiry
  createEnquire: async (payload: IEnquire) => {
    const newEnquire = new EnquireInfoModel(payload);
    const savedEnquire = await newEnquire.save();
    return savedEnquire;
  },

  // Find All Enquiries
  findAllEnquires: async (filter?: Partial<IEnquire>) => {
    return await EnquireInfoModel.find(filter || {});
  },

  // Find Enquiry by ID
  findEnquireById: async (id: string) => {
    return await EnquireInfoModel.findById(id);
  },

  // Find One Enquiry by filter
  findOneEnquire: async (filter: Partial<IEnquire>) => {
    return await EnquireInfoModel.findOne(filter);
  },

  // Update Enquiry
  updateEnquire: async (id: string, payload: Partial<IEnquire>) => {
    const updatedEnquire = await EnquireInfoModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedEnquire;
  },

  // Delete Enquiry
  deleteEnquire: async (id: string) => {
    return await EnquireInfoModel.findByIdAndDelete(id);
  },
};
