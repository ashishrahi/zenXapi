import { blogRepository } from "../repository";
import { IBlog } from "../types/IBlogTypes";
import { MESSAGES } from "../../../message/messages";

// Create Blog
export const createBlogService = async (payload: IBlog) => {
  try {
    const createdBlog = await blogRepository.createBlog(payload);
    return {
      success: true,
      message: MESSAGES.BLOG.CREATE_SUCCESS,
      data: createdBlog,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get All Blogs
export const getBlogsService = async () => {
  try {
    const blogs = await blogRepository.findAllBlogs();
    return {
      success: true,
      message: MESSAGES.BLOG.FETCH_SUCCESS,
      data: blogs,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get Single Blog by ID
export const getBlogByIdService = async (id: string) => {
  try {
    const blog = await blogRepository.findBlogById(id);
    if (!blog) {
      return { success: false, message: MESSAGES.BLOG.FETCH_FAILED };
    }
    return {
      success: true,
      message: MESSAGES.BLOG.FETCH_SUCCESS,
      data: blog,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Update Blog
export const updateBlogService = async (id: string, payload: IBlog) => {
  try {
    const updatedBlog = await blogRepository.updateBlog(id, payload);
    if (!updatedBlog) {
      return { success: false, message: MESSAGES.BLOG.UPDATE_FAILED };
    }
    return {
      success: true,
      message: MESSAGES.BLOG.UPDATE_SUCCESS,
      data: updatedBlog,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete Blog
export const deleteBlogService = async (id: string) => {
  try {
    const deletedBlog = await blogRepository.deleteBlog(id);
    if (!deletedBlog) {
      return { success: false, message: MESSAGES.BLOG.DELETE_FAILED };
    }
    return {
      success: true,
      message: MESSAGES.BLOG.DELETE_SUCCESS,
      data: deletedBlog,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
