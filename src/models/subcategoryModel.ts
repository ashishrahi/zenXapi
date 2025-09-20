import { Schema, model, Document, Types } from "mongoose";

export interface ISubCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  images: string[];
  categoryId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isDeleted:Boolean 
}

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    images: [{ type: String, required: true }],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const SubCategory = model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);
