import Color from "../../../models/colorModel";
import { IColor } from "../types/IColor";

export const colorRepository = {
  // Create Color
  createColor: async (payload: IColor) => {
    const newColor = new Color(payload);
    const savedColor = await newColor.save();
    return savedColor;
  },

  // Find All colors
  findAllColors: async () => {
    return await Color.find();
  },

  // Find Color By ID
  findColorById: async (id: string) => {
    return await Color.findById(id);
  },

  // Find One Color by filter
  findOneColor: async (filter: Partial<IColor>) => {
    return await Color.findOne(filter);
  },

  // Update Color
  updateColor: async (id: string, payload: Partial<IColor>) => {
    const updatedColor = await Color.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedColor;
  },

  // Delete color
  deleteColor: async (id: string) => {
  return await Color.findByIdAndUpdate(
    id,
    { isActive: true, deletedAt: new Date() }, // mark as deleted
    { new: true } // return the updated document
  );
},
};
