import { supplierRepository } from "../repository";
import { MESSAGES } from "../../../message/messages";
import { ISupplier } from "../types/ISupplierTypes";

// Create Supplier
export const createSupplierService = async (payload: ISupplier) => {
  try {
    const createdSupplier = await supplierRepository.createSupplier(payload);
    return {
      success: true,
      message: MESSAGES.SUPPLIER.CREATE_SUCCESS,
      data: createdSupplier,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get All Suppliers
export const getSupplierService = async () => {
  try {
    const suppliers = await supplierRepository.findAllSuppliers();
    return {
      success: true,
      message: MESSAGES.SUPPLIER.FETCH_SUCCESS,
      data: suppliers,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Update Supplier
export const updateSupplierService = async (id: string, payload: ISupplier) => {
  try {
    const updatedSupplier = await supplierRepository.updateSupplier(id, payload);

    if (!updatedSupplier) {
      return { success: false, message: MESSAGES.SUPPLIER.UPDATE_FAILED };
    }

    return {
      success: true,
      message: MESSAGES.SUPPLIER.UPDATE_SUCCESS,
      data: updatedSupplier,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete Supplier
export const deleteSupplierService = async (id: string) => {
  try {
    const deletedSupplier = await supplierRepository.deleteSupplier(id);

    if (!deletedSupplier) {
      return { success: false, message: MESSAGES.SUPPLIER.DELETE_FAILED };
    }

    return {
      success: true,
      message: MESSAGES.SUPPLIER.DELETE_SUCCESS,
      data: deletedSupplier,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
