import mongoose, { Schema, Document } from "mongoose";

interface ICountry extends Document {
  name: string;
  code: string; // ISO code
  status: "Active" | "Inactive";
}

const CountrySchema = new Schema<ICountry>({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
}, { timestamps: true });

export default mongoose.model<ICountry>("CountryMaster", CountrySchema);
