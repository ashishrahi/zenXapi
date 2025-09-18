import { Schema, model, Document, Types } from "mongoose";

export interface ISubCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  category: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export const SubCategory = model<ISubCategory>("SubCategory", subCategorySchema);
