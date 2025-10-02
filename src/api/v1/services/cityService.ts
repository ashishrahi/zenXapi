import { cityRepository } from "../repository";
import { MESSAGES } from "../../../message/messages";
import { ICity } from "../types/ICity";

interface PopulatedCity {
  _id: any;
  name: string;
  stateId: {
    _id: any;
    name: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

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
    
    const transformedCities = cities.map(cityObj => {
      // Convert to plain object if it's a Mongoose document
      const cityData = (cityObj as any).toObject ? (cityObj as any).toObject() : cityObj;
      
      return {
        _id: cityData._id,
        name: cityData.name,
        state: (cityData as PopulatedCity).stateId?.name || 'Unknown State',
        isActive: cityData.isActive,
        createdAt: cityData.createdAt,
        updatedAt: cityData.updatedAt,
        __v: cityData.__v
      };
    });

    return {
      success: true,
      message: MESSAGES.CITY.FETCH_SUCCESS,
      data: transformedCities,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Update City
export const updateCityService = async (id: string, payload: Partial<ICity>) => {
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