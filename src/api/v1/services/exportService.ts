import { MESSAGES } from "../../../message/messages";
import {exportRepository } from "../repository/index";
import { IExport } from "../types/IExport";

// createExportService
export const createExportService = async (payload: IExport) => {
  try {
    const createdExport = await exportRepository.createExport(payload);
    return {
      status: true,
      message: MESSAGES.EXPORT.CREATE_SUCCESS,
      data: createdExport,
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

// get
export const getExportService = async (payload: IExport) => {
  try {
    const exportList = await exportRepository.findAllExport();

    return {
      status: true,
      message: MESSAGES.EXPORT.FETCH_SUCCESS,
      data: exportList,
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

// update export Service
export const updateExportService = async (id:string, payload: IExport) => {
  try {
    const existingExport = await exportRepository.updateExport(id, payload);

    return {
      status: true,
      message: MESSAGES.EXPORT.UPDATE_SUCCESS,
      data:existingExport
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

// export delete
export const deleteExportService = async (payload: IExport) => {
  try {
    const {id} = payload;
    const existingExport = await exportRepository.deleteExport(id);

    if (existingExport) {
      return {
        success: false,
        message: MESSAGES.EXPORT.DELETE_SUCCESS,
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
