import { Types } from "mongoose";

export interface ISubCategory {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  images?: string[]; // Only URLs in database (strings)
  categoryId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create interfaces for different operations
export interface ICreateSubCategoryPayload {
  name?: string;
  slug?: string;
  description?: string;
  categoryId?: string;
  images?: Express.Multer.File[]; // Only files for creation
}

export interface IUpdateSubCategoryPayload {
  name?: string;
  slug?: string;
  description?: string;
  categoryId?: string;
  images?: (string | Express.Multer.File)[]; // Mixed array for updates
  existingImages?: string[]; // Existing image URLs to keep
}