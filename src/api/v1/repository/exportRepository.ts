import Export from "../../../models/exportModel";
import { IExport } from "../types/IExport";

export const exportRepository = {
  // Create export
  createExport: async (payload: IExport) => {
    const newExport = new Export(payload);
    const savedExport = newExport.save();
    return savedExport;
  },

  // Find All export
  findAllExport: async () => {
    return await Export.find().populate("countryId");
  },

  // Find Export By ID
  findExportById: async (id: string) => {
    return await Export.findById(id);
  },

  // Find One Export by filter
  findOneExport: async (filter: Partial<IExport>) => {
    return await Export.findOne(filter);
  },

  // Update Export
  updateExport: async (id: string, payload: Partial<IExport>) => {
    const updatedExport = await Export.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedExport;
  },

  // Delete export
  deleteExport: async (id: string) => {
    return await Export.findByIdAndUpdate(
    id,
    { isActive: true, deletedAt: new Date() }, // mark as deleted
    { new: true } // return the updated document
  );
  },
};
