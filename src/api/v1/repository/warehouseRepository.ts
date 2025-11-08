import Warehouse from "../../../models/warehouseModel";
import { IWarehouse } from "../types/IWarehouse";

export const warehouseRepository = {
  // Create Warehouse
  createWarehouse: async (payload: IWarehouse) => {
    const newWarehouse = new Warehouse(payload);
    const savedWarehouse = await newWarehouse.save();
    return savedWarehouse;
  },

  // Find All Warehouses
  findAllWarehouses: async () => {
    return await Warehouse.find({ isActive: true })
      .select("name type address personnel status")
      .lean();
  },

  // Find Warehouse By ID
  findWarehouseById: async (id: string) => {
    return await Warehouse.findById(id).lean();
  },

  // Find One Warehouse by filter
  findOneWarehouse: async (filter: Partial<IWarehouse>) => {
    return await Warehouse.findOne(filter);
  },

  // Update Warehouse
  updateWarehouse: async (id: string, payload: Partial<IWarehouse>) => {
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return updatedWarehouse;
  },

  // Delete Warehouse (Soft Delete)
  deleteWarehouse: async (id: string) => {
    return await Warehouse.findByIdAndUpdate(
      id,
      { isActive: false, deletedAt: new Date() },
      { new: true }
    );
  },
};
