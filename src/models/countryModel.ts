import mongoose, { Schema, Document, Types } from "mongoose";

// Interface for TypeScript
export interface ICountry extends Document {
  _id: Types.ObjectId;
  name: string;
  code: string;      // ISO code
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const CountrySchema = new Schema<ICountry>(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.model<ICountry>("CountryMaster", CountrySchema);
