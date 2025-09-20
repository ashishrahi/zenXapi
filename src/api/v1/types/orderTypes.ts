import { Types } from "mongoose";

export interface IOrders {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}