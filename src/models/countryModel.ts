import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICountry extends Document {
  _id: Types.ObjectId;
  name: string;
  code: string;    
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const CountrySchema = new Schema<ICountry>(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
      isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICountry>("CountryMaster", CountrySchema);
