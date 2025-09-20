import { Types } from "mongoose";

export interface ICategory {
  name: string;
  slug: string;
  gender: Types.ObjectId;
  description?: string;
  images: {
    files: Express.Multer.File[];
  }[];
}
