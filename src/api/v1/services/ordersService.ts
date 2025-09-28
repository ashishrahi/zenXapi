import { MESSAGES } from "../../../message/messages";
import { orderRepository } from "../repository/index";
import { IOrders } from "../types/orderTypes";

// Create Order Service
export const createOrderService = async (payload: IOrders) => {
  try {
    const createdOrder = await orderRepository.createOrder(payload);
    return {
      success: true,
      message: MESSAGES.ORDER.CREATE_SUCCESS,
      data: createdOrder,
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

// Get Orders Service
export const getOrdersService = async (payload?: any) => {
  try {
    const orders = await orderRepository.findAllOrders(payload);

    
    return {
      success: true,
      message: MESSAGES.ORDER.FETCH_SUCCESS,
      data: orders,
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

// Update Order Service
export const updateOrderService = async (id: string, payload: IOrders) => {
  try {
    const updatedOrder = await orderRepository.updateOrder(id, payload);
    if (updatedOrder) {
      return {
        success: true,
        message: MESSAGES.ORDER.UPDATE_SUCCESS,
        data: updatedOrder,
      };
    } else {
      return {
        success: false,
        message: MESSAGES.ORDER.UPDATE_FAILED,
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

// Delete Order Service
export const deleteOrderService = async (id: string) => {
  try {
    const deletedOrder = await orderRepository.deleteOrder(id);
    if (deletedOrder) {
      return {
        success: true,
        message: MESSAGES.ORDER.DELETE_SUCCESS,
        data: deletedOrder,
      };
    } else {
      return {
        success: false,
        message: MESSAGES.ORDER.DELETE_FAILED,
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
