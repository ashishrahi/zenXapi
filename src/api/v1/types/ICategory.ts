import { Types } from "mongoose";

export interface ICategory {
  name: string;
  slug: string;
  gender?: Types.ObjectId; // optional
  images: string[];        // array of strings
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}