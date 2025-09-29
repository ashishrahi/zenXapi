import { Product } from "../../../models/productModel";
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
    const products = await Product.find()
      .populate({
        path: "categoryId",
        select: "_id slug name",
      })
      .populate({
        path: "subcategoryId",
        select: "_id slug name",
      })
      .lean();

    return products;
  },

  // Find Product By ID
  findProductById: async (id: string) => {
    return await Product.findById(id);
  },

  findProductBySlug: async (slug: string) => {
    if (!slug) {
      throw new Error("Slug is required"); // or return null
    }
    return await Product.findOne({ slug: slug?.trim() });
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
     return await Product.findByIdAndUpdate(
    id,
    { isActive: true, deletedAt: new Date() }, // mark as deleted
    { new: true } // return the updated document
  );
  },
};
