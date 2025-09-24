import {dashboardRepository, exportRepository } from "../repository/index";
import { IExport } from "../types/IExport";

// dashboardService
export const getDashboardService = async (payload: IExport) => {
  try {
    const createdExport = await dashboardRepository.getDashboardMetrics(payload);
    return {
      status: true,
      message: "data fetch successfully",
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
