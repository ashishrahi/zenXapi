import { Types } from "mongoose";

export interface ISubCategory{
     name: string;
  slug: string;
  description?: string;
  images: string[];
  categoryId: Types.ObjectId; // ✅ Ensure this matches schema
  createdAt: Date;
  updatedAt: Date;
}