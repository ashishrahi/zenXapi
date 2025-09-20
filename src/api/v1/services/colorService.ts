import { MESSAGES } from "../../../message/messages";
import {colorRepository } from "../repository/index";
import {IColor  } from "../types/IColor";

// createColorService
export const createColorService = async (payload: IColor) => {
  try {
    const createdColor = await colorRepository.createColor(payload);
    return {
      status: true,
      message:MESSAGES.COLORS.CREATE_SUCCESS,
      data: createdColor,
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

// colorService
export const getColorService = async (payload: IColor) => {
  try {
    const colorsList = await colorRepository.findAllColors();

    return {
      status: true,
      message: MESSAGES.COLORS.FETCH_SUCCESS,
      data: colorsList,
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

// update color Service
export const updateColorService = async (id,payload: IColor) => {
  try {
    const existingColor = await colorRepository.updateColor(id, payload);

    return {
      status: true,
      message: MESSAGES.COLORS.CREATE_SUCCESS,
      data: existingColor
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

// color delete
export const deleteColorService = async (id: IColor) => {
  try {
    const existingColor = await colorRepository.deleteColor(id);

    if (existingColor) {
      return {
        success: false,
        message: MESSAGES.COLORS.DELETE_SUCCESS,
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
