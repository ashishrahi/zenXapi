import mongoose, { Mongoose, Schema, Types } from "mongoose";
// Interface
export interface IWarehouse extends Document{
    supplierId: Types.ObjectId,
    name: string,
    email: string,
    phone: number,
    address: string,
    isActive: boolean;
}
// schema
const WarehouseSchema = new Schema<IWarehouse>(
    {
        supplierId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Supplier"
        },
        name: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: Number, unique:true, required: true},
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
export default mongoose.model<IWarehouse>("Warehouse", WarehouseSchema);