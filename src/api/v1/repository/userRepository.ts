import User from "../../../models/userModel"
import { IUser } from "../types/userTypes";

export const userRepository = {
  // create
    createUser : async(payload:IUser) => {
        const newUser = new User(payload)
        const savedUser = newUser.save() 
             return savedUser;
      },
      // find
    findUser: async(payload:IUser) =>{
        const existingUser = await User.find()
         return existingUser
    },
    // find
    updateUser: async(id:Number, payload:IUser) =>{
      const updatedUser = await User.findByIdAndUpdate(id, payload)
      return updatedUser
    }
}