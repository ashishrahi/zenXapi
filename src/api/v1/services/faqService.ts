import { MESSAGES } from "../../../message/messages";
import {faqRepository } from "../repository/index";
import {IFAQ  } from "../types/IFAQTypes";

// createFaqService
export const createFaqService = async (payload: IFAQ) => {
  try {
    const createdFaq = await faqRepository.createFaq(payload);
    return {
      status: true,
      message: MESSAGES.FAQ.CREATE_SUCCESS,
      data: createdFaq,
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

// faqService
export const getFaqService = async (payload: IFAQ) => {
  try {
    const faqList = await faqRepository.findAllFaq();

    return {
      status: true,
      message: MESSAGES.FAQ.FETCH_SUCCESS,
      data: faqList,
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

// update faq Service
export const updateFaqService = async (id:string,payload: IFAQ) => {
  try {
      
    const existingFaq = await faqRepository.updateFaq(id, payload);

    if (existingFaq) {
      return {
        success: true,
        message: MESSAGES.FAQ.UPDATE_SUCCESS,
        data: existingFaq
      };
    }
   
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

// faq delete
export const deleteFaqService = async (id:string) => {
  try {
    const existingFaq = await faqRepository.deleteFaq(id);

    if (existingFaq) {
      return {
        success: false,
        message: MESSAGES.FAQ.DELETE_SUCCESS,
      };
    }
  
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
