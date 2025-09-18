import mongoose, { Schema, Document } from "mongoose";

export interface ISize extends Document {
  code: string;      
  name: string;       
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const sizeSchema = new Schema<ISize>(
  {
    code: {
      type: String,
      required: [true, "Size code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, "Size name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

// Export the model
const Size = mongoose.model<ISize>("Size", sizeSchema);
export default Size;
