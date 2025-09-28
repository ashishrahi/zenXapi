import { Types } from "mongoose";

export interface ICity {
  name: string;
  stateId: Types.ObjectId;
  status: boolean;
}