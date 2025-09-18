import { IUser } from '../types/userTypes';
import {userRepository} from '../repository/index'


// signUnService
export const userSignUpService = async(payload:IUser) =>{
try {
    const existingUser = await userRepository.findUser(payload)
    return{
        status: true,
        message: "user signup successfully",
        data: existingUser
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}




// signInService
export const userSignInService = async(payload:IUser) =>{
try {
    const existingUser = await userRepository.findUser(payload)

      if (existingUser) {
        return {
          success: false,
          message: "User already exists",
        };
      }
    return{
        status: true,
        message: "user signup successfully",
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}





