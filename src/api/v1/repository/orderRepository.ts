import {Orders} from "../../../models/ordersModel";
import { IOrders } from "../types/orderTypes";

export const orderRepository = {
  // Create Order
  createOrder: async (payload: IOrders) => {
    const newOrder = new Orders(payload);
    const savedOrder = await newOrder.save();
    return savedOrder;
  },

  // Find All Orders
  findAllOrders: async (filter?: Partial<IOrders>) => {
    return await Orders.find(filter || {});
  },

  // Find Order by ID
  findOrderById: async (id: string) => {
    return await Orders.findById(id);
  },

  // Find One Order by filter
  findOneOrder: async (filter: Partial<IOrders>) => {
    return await Orders.findOne(filter);
  },

  // Update Order
  updateOrder: async (id: string, payload: Partial<IOrders>) => {
    const updatedOrder = await Orders.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedOrder;
  },

  // Delete Order
  deleteOrder: async (id: string) => {
    return await Orders.findByIdAndDelete(id);
  },
};
