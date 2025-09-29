import mongoose, { Schema, Document } from "mongoose";
interface ICity extends Document {
  name: string;
  stateId: mongoose.Types.ObjectId;
  isActive: boolean;
}

const CitySchema = new Schema<ICity>({
  name: { type: String, required: true },
  stateId: { type: Schema.Types.ObjectId, ref: "StateMaster", required: true },
   isActive: {
      type: Boolean,
      default: true,
    },
}, { timestamps: true });

export default mongoose.model<ICity>("CityMaster", CitySchema);
