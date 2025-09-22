import { ApiResponse } from "./ApiResponse";
import { IProduct } from "./IProductTypes";

/**
 * ProductResponse is a specialized ApiResponse for product-related APIs.
 * It can handle a single product or an array of products.
 */
export type ProductResponse = ApiResponse<IProduct | IProduct[]>;
