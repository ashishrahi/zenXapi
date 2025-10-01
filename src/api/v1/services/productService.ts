import { IProduct, IVariant } from "../types/IProductTypes";
import { productRepository } from "../repository/index";
import { MESSAGES } from "../../../message/messages";
import {
  RawProduct,
  transformProducts,
} from "../../../utils/transformProducts";
import { uploadToCloudinary } from "../../../middleware/upload";
import slugify from "slugify";

// create product
export const createProductService = async (payload: IProduct, filesInput: any) => {
  try {
    const files = Array.isArray(filesInput) ? filesInput : [];
    if (files.length === 0) throw new Error("No files provided");

    const uploadedImageUrls = await uploadToCloudinary(files);

    const parseJSON = <T>(field: string | undefined): T[] => {
      try {
        return field ? JSON.parse(field) : [];
      } catch {
        return [];
      }
    };

    const sizes = Array.isArray(payload.sizes) ? payload.sizes : parseJSON<string>(payload.sizes as unknown as string);
    const colors = Array.isArray(payload.colors) ? payload.colors : parseJSON<string>(payload.colors as unknown as string);
    const variants: IVariant[] = Array.isArray(payload.variants)
      ? payload.variants
      : parseJSON<IVariant>(payload.variants as unknown as string);

    const finalVariants = variants.map((variant: IVariant) => ({
      ...variant,
      images: uploadedImageUrls,
      stock: Number(variant.stock) || 0,
    }));

    // ✅ Generate slug automatically
    let baseSlug = slugify(payload.name || "", { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await productRepository.findProductBySlug(slug)) { // Check DB for existing slug
      slug = `${baseSlug}-${count++}`;
    }

    const finalPayload: IProduct = {
      ...payload,
      slug, // Save the generated slug here
      sizes,
      colors,
      variants: finalVariants,
      images: uploadedImageUrls,
      stock: Number(payload.stock) || 0,
      rating: Number(payload.rating) || 0,
      price: Number(payload.price),
    };

    const newProduct = await productRepository.createProduct(finalPayload);

    return {
      success: true,
      message: MESSAGES.PRODUCT.CREATE_SUCCESS,
      data: newProduct,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};



// get product
export const getProductService = async () => {
  try {
    const existingProduct = await productRepository.findAllProducts();

 const transformedProducts = transformProducts(
      existingProduct.map((prod) => ({
        ...prod,
        _id: prod._id.toString(), // ObjectId -> string
        category: prod.categoryId as unknown as { slug: string },
        subCategory: prod.subcategoryId as unknown as { slug: string },
        // variants ko untouched rakho
      })) as unknown as RawProduct[]
    );

    return {
      success: true,
      message: MESSAGES.PRODUCT.FETCH_SUCCESS,
      data: transformedProducts,
    };
   
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// getProductbyIdService
export const getProductbySlugService = async (slug: string) => {
  try {
    const existingProduct = await productRepository.findProductBySlug(slug);

    if (!existingProduct) {
      return {
        success: false,
        message: MESSAGES.PRODUCT.FETCH_FAILED,
      };
    }

    const rawProduct: RawProduct = {
      ...existingProduct.toObject(),
      _id: existingProduct._id?.toString() || "",
      category: existingProduct.categoryId as unknown as { slug: string },
      subCategory: existingProduct.subcategoryId as unknown as { slug: string },
      variants: existingProduct.variants.map((v: any) =>
        typeof v === "string" ? { color: "", images: [], stock: 0, _id: "" } : v
      ),
      description: existingProduct.description || "",
      material: existingProduct.material || "",
      care: existingProduct.care || "",
      delivery: existingProduct.delivery || "",
      rating: existingProduct.rating || 0,
    };

    const transformedProduct = transformProducts([rawProduct])[0];

    return {
      success: true,
      message: MESSAGES.PRODUCT.FETCH_SUCCESS,
      data: transformedProduct, // <-- send the single transformed product
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
// getProductCollectionSlugService

export const getProductCollectionSlugService = async (slug: string) => {
  try {
    const existingProduct = await productRepository.findCollectionProductBySlug(slug);

     const transformedProducts = transformProducts(
      existingProduct.map((prod) => ({
        ...prod,
        _id: prod._id.toString(), // ObjectId -> string
        category: prod.categoryId as unknown as { slug: string },
        subCategory: prod.subcategoryId as unknown as { slug: string },
        // variants ko untouched rakho
      })) as unknown as RawProduct[]
    );
     return {
      success: true,
      message: MESSAGES.PRODUCT.FETCH_SUCCESS,
      data: transformedProducts,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// update service
export const updateProductService = async (id: string, payload: IProduct, filesInput: any) => {
  try {
    // Ensure filesInput is always an array
    const files = Array.isArray(filesInput) ? filesInput : [];
    if (files.length === 0) throw new Error("No files provided");

    // Upload files to Cloudinary
    const uploadedImageUrls = await uploadToCloudinary(files);

    // Helper to parse JSON safely
    const parseJSON = <T>(field: string | undefined): T[] => {
      try {
        return field ? JSON.parse(field) : [];
      } catch {
        return [];
      }
    };

    // Normalize sizes, colors, and variants
    const sizes = Array.isArray(payload.sizes) ? payload.sizes : parseJSON<string>(payload.sizes as unknown as string);
    const colors = Array.isArray(payload.colors) ? payload.colors : parseJSON<string>(payload.colors as unknown as string);
    const variants: IVariant[] = Array.isArray(payload.variants)
      ? payload.variants
      : parseJSON<IVariant>(payload.variants as unknown as string);

    // Attach uploaded images and normalize stock for each variant
    const finalVariants = variants.map((variant: IVariant) => ({
      ...variant,
      images: uploadedImageUrls, // all variants share uploaded images
      stock: Number(variant.stock) || 0,
    }));

    // Final product payload
    const finalPayload: IProduct = {
      ...payload,
      sizes,
      colors,
      variants: finalVariants,
      images: uploadedImageUrls,
      stock: Number(payload.stock) || 0,
      rating: Number(payload.rating) || 0,
      price: Number(payload.price),
    };


    const updatedProduct = await productRepository.updateProduct(
      id,
      finalPayload
    );

    if (!updatedProduct) {
      return { success: false, message: MESSAGES.PRODUCT.FETCH_FAILED };
    }

    return {
      success: true,
      message: MESSAGES.PRODUCT.UPDATE_SUCCESS,
      data: updatedProduct,
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

// delete service
export const deleteProductService = async (id: string) => {
  try {
    const deletedProduct = await productRepository.deleteProduct(id);

    if (deletedProduct) {
      return {
        success: true,
        message: MESSAGES.PRODUCT.DELETE_SUCCESS,
        data: deletedProduct,
      };
    }
  } catch (error) {
    console.error(MESSAGES.PRODUCT.DELETE_FAILED, error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error occurred" };
  }
};
