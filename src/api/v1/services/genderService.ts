import { genderRepository } from "../repository/index";
import { IGender } from "../types/genderTypes";

// createGenderService
export const createGenderService = async (payload: IGender) => {
  try {
    const createdGender = await genderRepository.createGender(payload);
    return {
      status: true,
      message: "gender successfully created",
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
      status: true,
      message: "gender successfully",
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
export const updateGenderService = async (payload: IGender) => {
  try {
    const existingGender = await genderRepository.findOneGender(payload);

    if (existingGender) {
      return {
        success: false,
        message: "gender already exists",
      };
    }
    return {
      status: true,
      message: "gender successfully",
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
export const deleteGenderService = async (payload: IGender) => {
  try {
    const existingGender = await genderRepository.findOneGender(payload);

    if (existingGender) {
      return {
        success: false,
        message: "gender already exists",
      };
    }
    return {
      status: true,
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
