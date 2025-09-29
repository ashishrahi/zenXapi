import User from "../../../models/userModel";
import { IUser } from "../types/userTypes";
import { Document } from "mongoose";

export interface IUserDocument extends IUser, Document {}

export const /* The `userRepository` object in the provided TypeScript code is a collection of
functions that interact with a MongoDB database to perform CRUD (Create, Read, Update,
Delete) operations on user documents. Here is a summary of what each function does: */
userRepository = {
  /**
   * Create a new user
   */
  createUser: async (payload: IUser): Promise<IUserDocument> => {
    try {
      const newUser = new User(payload);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Could not create user");
    }
  },

  /**
   * Find all users or filter by query
   */
  findUsers: async (query: Partial<IUser> = {}): Promise<IUserDocument[]> => {
    try {
      const users = await User.find(query);
      return users;
    } catch (error) {
      console.error("Error finding users:", error);
      throw new Error("Could not fetch users");
    }
  },

  /**
   * Find a single user by query
   */
  findOneUser: async (query: Partial<IUser>): Promise<IUserDocument | null> => {
    try {
      const user = await User.findOne(query)
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
      throw new Error("Could not fetch user");
    }
  },

  /**
   * Find a user by ID
   */
  findUserById: async (id: string): Promise<IUserDocument | null> => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error(`Error finding user with id ${id}:`, error);
      throw new Error("Could not fetch user");
    }
  },

  /**
   * Update a user by ID
   */
  updateUser: async (id: string, payload: Partial<IUser>): Promise<IUserDocument | null> => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, payload, { new: true });
      return updatedUser;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw new Error("Could not update user");
    }
  },

  /**
   * Delete a user by ID
   */
  deleteUser: async (id: string): Promise<IUserDocument | null> => {
    try {
        return await User.findByIdAndUpdate(
    id,
    { isActive: true, deletedAt: new Date() }, // mark as deleted
    { new: true } // return the updated document
  );
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw new Error("Could not delete user");
    }
  },
};
