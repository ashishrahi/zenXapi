import {Product} from "../../../models/productModel";
import { IProduct } from "../types/IProductTypes";

export const productRepository = {
  // Create 
  createProduct: async (payload: IProduct) => {
    const newProduct = new Product(payload);
    const savedProduct = await newProduct.save();
    return savedProduct;
  },

  // Find All Products
  findAllProducts: async () => {
    return await Product.find();
  },

  // Find Product By ID
  findProductById: async (id: string) => {
    return await Product.findById(id);
  },

  // Find One Product by filter
  findOneProduct: async (filter: Partial<IProduct>) => {
    return await Product.findOne(filter);
  },

  // Update Product
  updateProduct: async (id: string, payload: Partial<IProduct>) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedProduct;
  },

  // Delete Product
  deleteProduct: async (id: string) => {
    return await Product.findByIdAndDelete(id);
  },
};
