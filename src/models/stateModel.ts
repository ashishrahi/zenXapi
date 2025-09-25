import mongoose, { Schema, Document } from "mongoose";
interface IState extends Document {
  name: string;
  countryId: mongoose.Types.ObjectId;
  status: "Active" | "Inactive";
}

const StateSchema = new Schema<IState>({
  name: { type: String, required: true },
  countryId: { type: Schema.Types.ObjectId, ref: "CountryMaster", required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
}, { timestamps: true });

export default mongoose.model<IState>("StateMaster", StateSchema);
