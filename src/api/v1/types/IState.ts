import { Types } from "mongoose";

export interface IState {
  name: string;
  countryId: Types.ObjectId;
  status: boolean;
}