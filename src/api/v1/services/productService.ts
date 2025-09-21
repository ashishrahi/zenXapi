import { IProduct } from '../types/IProductTypes';
import {productRepository} from '../repository/index'
import { MESSAGES } from '../../../message/messages';
import { transformProducts } from '../../../utils/transformProducts';


// create product
export const createProductService = async(payload:IProduct) =>{
try {
    const existingProduct = await productRepository.createProduct(payload)

    
    return{
        status: true,
        message: MESSAGES.PRODUCT.CREATE_SUCCESS,
        data: existingProduct
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}




// get product
export const getProductService = async(payload:IProduct) =>{
try {
    const existingProduct = await productRepository.findAllProducts()
 const transformedProducts = transformProducts(existingProduct);
    
    return{
        status: true,
        message: MESSAGES.PRODUCT.FETCH_SUCCESS,
        data:transformedProducts
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}

// getProductbyIdService
export const getProductbyIdService = async(slug:IProduct) =>{
try {
    const existingProduct = await productRepository.findProductBySlug(slug)

    const transformedProduct = transformProducts([existingProduct])[0];
    
    return{
        status: true,
        message: MESSAGES.PRODUCT.FETCH_SUCCESS,
        data:transformedProduct
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}

// update service
export const updateProductService = async(id:string , payload:IProduct) =>{
try {
     // Ensure images is an array of strings matching the schema
        let updatedImages: string[] = [];
    
        if (Array.isArray(payload.images) && payload.images.length > 0) {
          // Flatten each file object to just the path (string)
          updatedImages = payload.images.map((file: any) => file.path);
        }
    
        const productData: Partial<IProduct> = {
          ...payload,
          images: updatedImages, // now matches schema [String]
        };
    
        const updatedProduct = await productRepository.updateProduct(
          id,
          productData
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
}}
}

// delete service
export const deleteProductService = async(id:string ) =>{
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
}




