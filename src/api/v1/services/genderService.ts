import { MESSAGES } from "../../../message/messages";
import { genderRepository } from "../repository/index";
import { IGender } from "../types/genderTypes";

// createGenderService
export const createGenderService = async (payload: IGender) => {
  try {
    const existingGender = await genderRepository.findOneGender({name:payload.name})
    if(existingGender){
      return{
        succcess: false,
        message: MESSAGES.GENERIC.ALREADY_EXISTS
      }
    }
    const createdGender = await genderRepository.createGender(payload);
    return {
      success: true,
      message: MESSAGES.GENDER.CREATE_SUCCESS,
      data: createdGender,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

// genderService
export const getGenderService = async (payload: IGender) => {
  try {
    const gendersList = await genderRepository.findAllGenders();

    return {
      success: true,
      message: MESSAGES.GENDER.FETCH_SUCCESS,
      data: gendersList,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

// update gender Service
export const updateGenderService = async (id:string, payload: IGender) => {
  try {
    const updatedGender = await genderRepository.updateGender(id,payload);
    return {
      success: true,
      message: MESSAGES.GENDER.UPDATE_SUCCESS,
      data:updatedGender
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

// gender delete
export const deleteGenderService = async (id: string) => {
  try {
    const existingGender = await genderRepository.deleteGender(id);

    if (existingGender) {
      return {
        success: false,
        message: "gender already exists",
      };
    }
    return {
      success: true,
      message: "user signup successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
