import { Schema, model, Document, Types } from "mongoose";

interface IVariant {
  images: string[];
  stock: number;
  color: string;


}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  variants: IVariant[];
  sizes: string[];
  colors: string[];
  categoryId: Types.ObjectId;
  subcategoryId: Types.ObjectId;
  material?: string;
  care?: string;
  delivery?: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

const variantSchema = new Schema<IVariant>({
   color: { type: String, required: true },
  images: { type: [String], required: true },
  stock: { type: Number, required: true },
});

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    variants: { type: [variantSchema], default: [] },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: "SubCategory", required: true },
    description: { type: String },
    material: { type: String },
    care: { type: String },
    delivery: { type: String },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    stock: { type: Number, default: 0 },
     isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// // Virtual id for frontend
// productSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });
// productSchema.set("toJSON", { virtuals: true });

// // Update stock automatically
// productSchema.pre<IProduct>("save", function (next) {
//   this.stock = this.variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0;
//   next();
// });

export const Product = model<IProduct>("Product", productSchema);