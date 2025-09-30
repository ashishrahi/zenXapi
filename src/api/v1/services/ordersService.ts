import { MESSAGES } from "../../../message/messages";
import { mapOrderForAdmin, mapOrderForUser } from "../mappers/orderMappers";
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
export const getOrdersService = async (role:string) => {
  try {
    const orders = await orderRepository.findAllOrders();

    if (role === "admin") {
    return {
      success: true,
      message: "Orders fetched for admin",
      data: orders.map(mapOrderForAdmin)
    }
  } else {
    return {
      success: true,
      message: "Orders fetched for user",
      data: orders.map(mapOrderForUser)
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
