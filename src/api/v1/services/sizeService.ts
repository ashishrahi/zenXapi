import { genderRepository, sizeRepository } from "../repository/index";
import {ISize  } from "../types/sizeTypes";

// createSizeService
export const createSizeService = async (payload: ISize) => {
  try {
    const createdSize = await sizeRepository.createSize(payload);
    return {
      status: true,
      message: "size successfully created",
      data: createdSize,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

// sizeService
export const getSizeService = async (payload: ISize) => {
  try {
    const sizesList = await sizeRepository.findAllSizes();

    return {
      status: true,
      message: "size successfully",
      data: sizesList,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

// update size Service
export const updateSizeService = async (id, payload: ISize) => {
  try {
    const existingSize = await sizeRepository.updateSize(id,payload);
    return {
      status: true,
      message: "size successfully",
      data:existingSize
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

// size delete
export const deleteSizeService = async (id: ISize) => {
  try {
    const existingSize = await sizeRepository.deleteSize(id);

    if (existingSize) {
      return {
        success: false,
        message: "size already exists",
      };
    }
  
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
