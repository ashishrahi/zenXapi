import { IUser } from '../types/userTypes';
import {userRepository} from '../repository/index'
import { MESSAGES } from '../../../message/messages';


// getUserService
export const getUserService = async(payload:IUser) =>{
try {
    const existingUser = await userRepository.findUsers(payload)
    return{
        success: true,
        message: "list of users",
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




// updateUserService
export const updateUserService = async(id:string,payload:IUser) =>{
try {
    const existingUser = await userRepository.updateUser(id,payload)

      if (existingUser) {
        return {
          success: false,
          message: MESSAGES.USER.UPDATE_FAILED,
        };
      }
    return{
        success: true,
        message:MESSAGES.USER.UPDATE_SUCCESS
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}


// deleteUserService

export const deleteUserService = async(id:string) =>{
try {
    const existingUser = await userRepository.deleteUser(id)

      if (existingUser) {
        return {
          success: false,
          message: MESSAGES.USER.UPDATE_FAILED,
        };
      }
    return{
        success: true,
        message:MESSAGES.USER.UPDATE_SUCCESS
    }
} catch (error) {
   if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
}}
}
