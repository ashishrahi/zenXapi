// src/mappers/orderMapper.ts

export const mapOrderForUser = (order: any) => {
  return {
    orderId: order._id,
    products: order.products.map((item: any) => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    })),
    shippingAddress: {
      address: order.shippingAddress.address,
      city: order.shippingAddress.city,
      postalCode: order.shippingAddress.postalCode,
      country: order.shippingAddress.country,
    },
    paymentMethod: order.paymentMethod,
    totalPrice: order.totalPrice,
    status: order.status,
    createdAt: order.createdAt,
  };
};

export const mapOrderForAdmin = (order: any) => {
  return {
    _id: order._id,
    userId: {
      _id: order.userId?._id,
      name: order.userId?.name,
    },
    products: order.products.map((item: any) => ({
      product: {
        _id: item.product._id,
        name: item.product.name,
        price: item.product.price,
      },
      quantity: item.quantity,
      price: item.price,
    })),
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    isActive: order.isActive,
    taxPrice: order.taxPrice,
    shippingPrice: order.shippingPrice,
    totalPrice: order.totalPrice,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    __v: order.__v,
  };
};
