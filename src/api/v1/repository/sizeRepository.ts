import Size from "../../../models/sizeModel";
import { ISize } from "../types/sizeTypes";

export const sizeRepository = {
  // Create Size
  createSize: async (payload: ISize) => {
    const newSize = new Size(payload);
    const savedSize = await newSize.save();
    return savedSize;
  },

  // Find All Sizes
  findAllSizes: async () => {
    return await Size.find();
  },

  // Find Size By ID
  findSizeById: async (id: string) => {
    return await Size.findById(id);
  },

  // Find One Size by filter
  findOneSize: async (filter: Partial<ISize>) => {
    return await Size.findOne(filter);
  },

  // Update Size
  updateSize: async (id: string, payload: Partial<ISize>) => {
    const updatedSize = await Size.findByIdAndUpdate(id, payload,{
      new: true,
      runValidators: true,
    });
    return updatedSize;
  },

  // Delete Size
 deleteSize: async (id: string) => {
  return await Size.findByIdAndUpdate(
    id,
    { isDeleted: true, deletedAt: new Date() }, // mark as deleted
    { new: true } // return the updated document
  );
},
};
