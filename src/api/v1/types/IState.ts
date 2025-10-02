import { Types } from "mongoose";

export interface IState {
    _id: string;
  name: string;
  countryId: Types.ObjectId;
  status: boolean;
}