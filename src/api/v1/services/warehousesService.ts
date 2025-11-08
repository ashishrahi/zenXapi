import { warehouseRepository } from "../repository";
import { MESSAGES } from "../../../message/messages";
import { IWarehouse } from "../types/IWarehouse";

// Create Warehouse
export const createWarehouseService = async (payload: IWarehouse) => {
  try {
    const createdWarehouse = await warehouseRepository.createWarehouse(payload);
    return {
      success: true,
      message: MESSAGES.WAREHOUSE.CREATE_SUCCESS,
      data: createdWarehouse,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get All Warehouses
export const getWarehouseService = async () => {
  try {
    const warehouses = await warehouseRepository.findAllWarehouses();
    return {
      success: true,
      message: MESSAGES.WAREHOUSE.FETCH_SUCCESS,
      data: warehouses,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get Warehouse by ID
export const detailWarehouseService = async (id: string) => {
  try {
    const warehouse = await warehouseRepository.findWarehouseById(id);
    if (!warehouse) {
      return { success: false, message: MESSAGES.WAREHOUSE.FETCH_FAILED };
    }

    return {
      success: true,
      message: MESSAGES.WAREHOUSE.FETCH_SUCCESS,
      data: warehouse,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Update Warehouse
export const updateWarehouseService = async (id: string, payload: IWarehouse) => {
  try {
    const updatedWarehouse = await warehouseRepository.updateWarehouse(id, payload);

    if (!updatedWarehouse) {
      return { success: false, message: MESSAGES.WAREHOUSE.UPDATE_FAILED };
    }

    return {
      success: true,
      message: MESSAGES.WAREHOUSE.UPDATE_SUCCESS,
      data: updatedWarehouse,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete Warehouse
export const deleteWarehouseService = async (id: string) => {
  try {
    const deletedWarehouse = await warehouseRepository.deleteWarehouse(id);

    if (!deletedWarehouse) {
      return { success: false, message: MESSAGES.WAREHOUSE.DELETE_FAILED };
    }

    return {
      success: true,
      message: MESSAGES.WAREHOUSE.DELETE_SUCCESS,
      data: deletedWarehouse,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
