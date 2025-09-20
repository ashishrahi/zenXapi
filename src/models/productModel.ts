import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  variants: string[];
  sizes: string[];
  colors: string[];
  category: Types.ObjectId;
  subCategory: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  material: string;
  care: string;
  delivery: string;
  rating: number
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    colors: [{ type: String }],
     variants: [
      {
        color: { type: String, required: true },
        images: [{ type: String, required: true }],
        stock: { type: Number, required: true }
      }
    ],
    sizes: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: "SubCategory", required: true },
    description: { type: String },
    material: {type: String},
    care :{ type: String},
    delivery: {type: String},
    rating: {type: Number},
    stock: { type: Number, default: 0 },
   
  },
  { timestamps: true }
);



productSchema.pre('save', function (next) {
  if (this.variants && this.variants.length > 0) {
    this.stock = this.variants.reduce((sum, variant) => sum + variant.stock, 0);
  } else {
    this.stock = 0;
  }
  next();
});


export const Product = model<IProduct>("Product", productSchema);
