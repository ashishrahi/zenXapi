// types/ICity.ts
import { IState } from "./IState";

export interface ICity {
  _id: string;
  name: string;
  code: string;
  state:string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}