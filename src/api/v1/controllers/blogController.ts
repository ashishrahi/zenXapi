import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { blogService } from "../services";
import { ApiResponse } from "../types/ApiResponse";

// Create Blog
export const createBlogController = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const { title, description, content, category, author, tags } = req.body;

    if (!title || !description || !content || !category) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Title, description, content, and category are required",
      });
    }

    if (!files || files.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Image is required",
      });
    }

    const { success, message, data } = await blogService.createBlogService({
      title,
      description,
      content,
      category,
      author,
      tags: tags ? JSON.parse(tags) : [],
      imageFile: files[0],
      isActive:true,
    }) as ApiResponse;

    res.status(StatusCodes.CREATED).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating blog post",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Get All Blogs
export const getBlogController = async (_req: Request, res: Response) => {
  try {
    const { success, message, data } = await blogService.getBlogsService() as ApiResponse;
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching blogs",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Get Blog by ID
export const getBlogbyIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { success, message, data } = await blogService.getBlogByIdService(id) as ApiResponse;

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching blog post",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Update Blog
export const updateBlogController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];
    const payload = req.body;

    if (files && files.length > 0) {
      payload.imageFile = files[0];
    }

    if (payload.tags) {
      payload.tags = JSON.parse(payload.tags); // convert string to array if sent as string
    }

    const { success, message, data } = await blogService.updateBlogService(id, payload) as ApiResponse;

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Blog post not found or could not be updated",
      });
    }

    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating blog post",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Delete Blog
export const deleteBlogController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { success, message, data } = await blogService.deleteBlogService(id) as ApiResponse;

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Blog post not found or could not be deleted",
      });
    }

    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting blog post",
      error: error instanceof Error ? error.message : error,
    });
  }
};
