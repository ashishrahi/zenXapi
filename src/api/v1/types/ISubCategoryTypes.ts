import { Types } from "mongoose";

export interface ISubCategory {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  images?: string[] | { files: Express.Multer.File[] }[];
  categoryId?: Types.ObjectId; // ✅ Ensure this matches schema
  createdAt?: Date;
  updatedAt?: Date;
}
