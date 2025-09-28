import { countryRepository } from "../repository";
import { MESSAGES } from "../../../message/messages";
import {ICountry} from '../types/ICountry'

// Create Country
export const createCountryService = async (payload: ICountry) => {
  try {
    const createdCountry = await countryRepository.createCountry(payload);
    return {
      success: true,
      message: MESSAGES.COUNTRY.CREATE_SUCCESS,
      data: createdCountry,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get All Countries
export const getCountryService = async (limit?: number, after?: string) => {
  try {
    const result = await countryRepository.findAllCountries(limit, after);

    return {
      success: true,
      message: MESSAGES.COUNTRY.FETCH_SUCCESS,
      data: result.countries,
      nextCursor: result.nextCursor,
      count: result.count,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};


// Update Country
export const updateCountryService = async (id: string, payload: ICountry) => {
  try {
    const updatedCountry = await countryRepository.updateCountry(id, payload);
    if (!updatedCountry) {
      return { success: false, message: MESSAGES.COUNTRY.UPDATE_FAILED };
    }
    return {
      success: true,
      message: MESSAGES.COUNTRY.UPDATE_SUCCESS,
      data: updatedCountry,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete Country
export const deleteCountryService = async (id: string) => {
  try {
    const deletedCountry = await countryRepository.deleteCountry(id);
    if (!deletedCountry) {
      return { success: false, message: MESSAGES.COUNTRY.DELETE_FAILED };
    }
    return {
      success: true,
      message: MESSAGES.COUNTRY.DELETE_SUCCESS,
      data: deletedCountry,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
