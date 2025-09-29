import { Blog } from "../../../models/blogModel";
import { IBlog } from "../types/IBlogTypes";

export const blogRepository = {
  // Create Blog
  createBlog: async (payload: IBlog) => {
    const newBlog = new Blog(payload);
    const savedBlog = await newBlog.save();
    return savedBlog;
  },

  // Find All Blogs
  findAllBlogs: async (filter?: Partial<IBlog>) => {
    return await Blog.find(filter || {}).sort({ createdAt: -1 });
  },

  // Find Blog by ID
  findBlogById: async (id: string) => {
    return await Blog.findById(id);
  },

  // Find One Blog by filter (e.g., by title or slug)
  findOneBlog: async (filter: Partial<IBlog>) => {
    return await Blog.findOne(filter);
  },

  // Update Blog
  updateBlog: async (id: string, payload: Partial<IBlog>) => {
    const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
      new: true,           // Return the updated document
      runValidators: true, // Run schema validation on update
    });
    return updatedBlog;
  },

  // Delete Blog
  deleteBlog: async (id: string) => {
    return await Blog.findByIdAndUpdate(
    id,
    { isActive: true, deletedAt: new Date() }, // mark as deleted
    { new: true } // return the updated document
  );
  },
};
