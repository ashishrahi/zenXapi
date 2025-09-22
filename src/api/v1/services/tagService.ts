import { MESSAGES } from "../../../message/messages";
import {tagRepository } from "../repository/index";
import {ITag  } from "../types/ITag";

// createTagService
export const createTagService = async (payload: ITag) => {
  try {
    const createdTag = await tagRepository.createTag(payload);
    return {
      success: true,
      message: MESSAGES.TAG.CREATE_SUCCESS,
      data: createdTag,
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

// tagService
export const getTagService = async (payload: ITag) => {
  try {
    const tagsList = await tagRepository.findAllTag();

    return {
      success: true,
      message: MESSAGES.TAG.FETCH_SUCCESS,
      data: tagsList
    ,
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

// update tag Service
export const updateTagService = async (id:string, payload: ITag) => {
  try {
    const existingTag = await tagRepository.updateTag(id, payload);

    if (existingTag) {
      return {
        success: false,
        message: MESSAGES.TAG.UPDATE_SUCCESS,
        data: existingTag
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

// tag delete
export const deleteTagService = async (id:string) => {
  try {
    const existingTag = await tagRepository.deleteTag(id);

    if (existingTag) {
      return {
        success: false,
        message: MESSAGES.TAG.DELETE_SUCCESS,
        data: existingTag
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
