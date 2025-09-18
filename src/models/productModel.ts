import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  images: string[];
  sizes: string[];
  colors: string[];
  category: Types.ObjectId;
  subCategory: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
    sizes: [{ type: String }],
    colors: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: "SubCategory", required: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
