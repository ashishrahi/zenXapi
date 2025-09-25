import mongoose, { Schema, Document } from "mongoose";
interface ICity extends Document {
  name: string;
  stateId: mongoose.Types.ObjectId;
  status: "Active" | "Inactive";
}

const CitySchema = new Schema<ICity>({
  name: { type: String, required: true },
  stateId: { type: Schema.Types.ObjectId, ref: "StateMaster", required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
}, { timestamps: true });

export default mongoose.model<ICity>("CityMaster", CitySchema);
