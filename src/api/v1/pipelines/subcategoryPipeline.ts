import mongoose from "mongoose";
import { ISubCategoryQuery } from "../types/ISubCategoryTypes";

export const buildSubCategoryPipeline = (
  payload: ISubCategoryQuery,
  isCountPipeline = false
) => {
    
  const { search, categoryId, isActive, limit = 10, cursor } = payload;
  const pipeline: any[] = [];

  // 1️⃣ Category filter
  if (categoryId) {
    pipeline.push({
      $match: { categoryId: new mongoose.Types.ObjectId(categoryId) }
    });
  }

  // 2️⃣ Search filter
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } }
        ]
      }
    });
  }

  // 3️⃣ isActive filter
  if (isActive) {
    pipeline.push({ $match: { isActive: isActive === "true" } });
  }

  // 4️⃣ Cursor filter (for pagination)
  if (!isCountPipeline && cursor) {
    pipeline.push({
      $match: { _id: { $gt: new mongoose.Types.ObjectId(cursor) } }
    });
  }

  // 5️⃣ Lookup category
  pipeline.push(
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category"
      }
    },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        name: 1,
        description: 1,
        images: 1,
        categoryId: 1,
        "category.slug": 1,
        createdAt: 1
      }
    }
  );

  // 6️⃣ Sort & limit
  if (!isCountPipeline) {
    pipeline.push({ $sort: { _id: 1 } });
    pipeline.push({ $limit: limit + 1 }); // fetch one extra for nextCursor
  }

  return pipeline;
};
