import User from "../../../models/userModel";
import {Orders} from "../../../models/ordersModel";
import { IExport } from "../types/IExport";
import { EnquireInfoModel } from "../../../models/equireModel";

export const dashboardRepository = {
  // Fetch dashboard metrics
  getDashboardMetrics: async (payload: IExport) => {
    // Example: payload could have filters like date range
    const totalUsers = await User.countDocuments();
    const totalOrders = await Orders.countDocuments();
    const totalEnquire = await EnquireInfoModel.countDocuments()
    
    // const totalRevenueAgg = await Orders.aggregate([
    //   { $match: { createdAt: { $gte: payload.startDate, $lte: payload.endDate } } },
    //   { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    // ]);

    // const totalRevenue = totalRevenueAgg[0]?.total || 0;

    return {
      totalUsers,
      totalOrders,
      totalEnquire
    //   totalRevenue,
    };
  },

  // Other repository methods
  exportData: async (payload: IExport) => {
    // Some export logic
    return { message: "Export logic placeholder" };
  },
};
