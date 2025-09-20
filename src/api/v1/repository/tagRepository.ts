import Tag from "../../../models/tagModel";
import { ITag } from "../types/ITag";

export const tagRepository = {
  // Create tag
  createTag: async (payload: ITag) => {
    const newTag = new Tag(payload);
    const savedTag = newTag.save();
    return savedTag;
  },

  // Find All Tag
  findAllTag: async () => {
    return await Tag.find();
  },

  // Find Tag By ID
  findTagById: async (id: string) => {
    return await Tag.findById(id);
  },

  // Find One Tag by filter
  findOneTag: async (filter: Partial<ITag>) => {
    return await Tag.findOne(filter);
  },

  // Update Tag
  updateTag: async (id: string, payload: Partial<ITag>) => {
    const updatedTag = await Tag.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedTag;
  },

  // Delete Tag
  deleteTag: async (id: string) => {
    return await Tag.findByIdAndDelete(id);
  },
};
