import { blogRepository } from "../repository";
import { IBlog } from "../types/IBlogTypes";
import { MESSAGES } from "../../../message/messages";
import { handleImageUpload } from "../../../utils/handleImageUpload";

interface IBlogCreate {
  title: string;
  description: string;
  content: string;
  category: string;
  imageFile: Express.Multer.File; // single file
  author?: string;
  tags?: string[];
}

interface IBlogUpdate extends Partial<IBlogCreate> {
  id: string;
}

// Create Blog
export const createBlogService = async (payload: IBlogCreate) => {
  try {
    let uploadedImages: string[] = [];

    if (payload.imageFile) {
      uploadedImages = await handleImageUpload([payload.imageFile]);
    }

    const blogData: IBlog = {
      title: payload.title,
      description: payload.description,
      content: payload.content,
      category: payload.category,
      images: uploadedImages,
      author: payload.author,
      tags: payload.tags || [],
    };

    const createdBlog = await blogRepository.createBlog(blogData);

    return { success: true, message: MESSAGES.BLOG.CREATE_SUCCESS, data: createdBlog };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Update Blog
export const updateBlogService = async (id: string, payload: Partial<IBlogUpdate>) => {
  try {
    let updateData: Partial<IBlog> = { ...payload };

    // handle image file
    if (payload.imageFile) {
      const images = await handleImageUpload([payload.imageFile]);
      updateData.images = images;
    }

    // keep tags as array
    if (payload.tags) {
      updateData.tags = payload.tags;
    }

    const updatedBlog = await blogRepository.updateBlog(id, updateData);
    if (!updatedBlog) return { success: false, message: MESSAGES.BLOG.UPDATE_FAILED };

    return { success: true, message: MESSAGES.BLOG.UPDATE_SUCCESS, data: updatedBlog };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get All Blogs
export const getBlogsService = async () => {
  try {
    const blogs = await blogRepository.findAllBlogs();
    return { success: true, message: MESSAGES.BLOG.FETCH_SUCCESS, data: blogs };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get Blog by ID
export const getBlogByIdService = async (id: string) => {
  try {
    const blog = await blogRepository.findBlogById(id);
    if (!blog) return { success: false, message: MESSAGES.BLOG.FETCH_FAILED };

    return { success: true, message: MESSAGES.BLOG.FETCH_SUCCESS, data: blog };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete Blog
export const deleteBlogService = async (id: string) => {
  try {
    const deletedBlog = await blogRepository.deleteBlog(id);
    if (!deletedBlog) return { success: false, message: MESSAGES.BLOG.DELETE_FAILED };

    return { success: true, message: MESSAGES.BLOG.DELETE_SUCCESS, data: deletedBlog };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
