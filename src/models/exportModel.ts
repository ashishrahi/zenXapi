import mongoose, { Schema, Document, Types } from "mongoose";

// Interface for TypeScript
export interface IExport extends Document {
  _id: Types.ObjectId;
  countryId: Types.ObjectId; // reference to CountryMaster
  code: string;              // export code
  volume: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const ExportItemSchema = new Schema<IExport>(
  {
    countryId: { type: Schema.Types.ObjectId, ref: "countryModel", required: true },
    code: { type: String, required: true },
    volume: { type: String },
    category: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.model<IExport>("ExportItem", ExportItemSchema);
