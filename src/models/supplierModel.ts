import mongoose, { Schema } from "mongoose";

export interface ISupplier extends Document {
  name: string;
  email: string;
  phone: number;
  address: string;
  isActive: boolean;
}

const SupplierSchema = new Schema<ISupplier>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true },
    phone: { type: Number, unique: true, required: true },
    address: [
      {
        house: { type: String },
        cityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CityMaster",
        },
        stateId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "StateMaster",
          required: true,
        },
        countryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CountryMaster",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ISupplier>("Supplier", SupplierSchema);
