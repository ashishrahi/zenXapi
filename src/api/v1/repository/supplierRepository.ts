import Supplier from "../../../models/supplierModel";
import { ISupplier } from "../types/ISupplierTypes";

export const supplierRepository = {
  // Create Supplier
  createSupplier: async (payload: ISupplier) => {
    const newSupplier = new Supplier(payload);
    const savedSupplier = await newSupplier.save();
    return savedSupplier;
  },

  // Find All Suppliers
  findAllSuppliers: async () => {
    return await Supplier.find({isActive: true}).select("name email mobile company").lean();
  },

  // Find Supplier By ID
  findSupplierById: async (id: string) => {
    return await Supplier.findById(id).lean();
  },

  // Find One Supplier by filter
  findOneSupplier: async (filter: Partial<ISupplier>) => {
    return await Supplier.findOne(filter);
  },

  // Update Supplier
  updateSupplier: async (id: string, payload: Partial<ISupplier>) => {
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return updatedSupplier;
  },

  // Delete Supplier (Soft Delete)
  deleteSupplier: async (id: string) => {
    return await Supplier.findByIdAndUpdate(
      id,
      { isActive: false, deletedAt: new Date() },
      { new: true }
    );
  },
};
