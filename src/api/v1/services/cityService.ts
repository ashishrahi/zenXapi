import { cityRepository } from "../repository";
import { MESSAGES } from "../../../message/messages";
import { ICity } from "../types/ICity";

// Create City
export const createCityService = async (payload: ICity) => {
  try {
    const createdCity = await cityRepository.createCity(payload);
    return {
      success: true,
      message: MESSAGES.CITY.CREATE_SUCCESS,
      data: createdCity,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get All Cities
export const getCityService = async () => {
  try {
    const cities = await cityRepository.findAllCities();
    return {
      success: true,
      message: MESSAGES.CITY.FETCH_SUCCESS,
      data: cities,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Update City
export const updateCityService = async (id: string, payload: ICity) => {
  try {
    const updatedCity = await cityRepository.updateCity(id, payload);

    if (!updatedCity) {
      return { success: false, message: MESSAGES.CITY.UPDATE_FAILED };
    }

    return {
      success: true,
      message: MESSAGES.CITY.UPDATE_SUCCESS,
      data: updatedCity,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete City
export const deleteCityService = async (id: string) => {
  try {
    const deletedCity = await cityRepository.deleteCity(id);

    if (!deletedCity) {
      return { success: false, message: MESSAGES.CITY.DELETE_FAILED };
    }

    return {
      success: true,
      message: MESSAGES.CITY.DELETE_SUCCESS,
      data: deletedCity,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
