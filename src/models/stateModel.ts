import mongoose, { Schema, Document } from "mongoose";
interface IState extends Document {
  name: string;
  code: string;
  countryId: mongoose.Types.ObjectId;
  status: boolean;
}

const StateSchema = new Schema<IState>({
  name: { type: String, required: true },
  code: { type: String, required: true },

  countryId: { type: Schema.Types.ObjectId, ref: "CountryMaster", required: true },
  status: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IState>("StateMaster", StateSchema);
