import { Types } from "mongoose";

export interface IUser {
  authId: Types.ObjectId; // Reference to Auth collection
  name: string;
  phone?: string;
  dateOfBirth?: Date;
  genderId?: Types.ObjectId; // optional reference
  createdAt?: Date;
  updatedAt?: Date;
  
}
