import { createError } from "@/config";
import Blog from "@/models/blog.model";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleFindSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const findEdBlog = await Blog.findOne({ slug });

    if (!findEdBlog) {
      throw createError(404, "No blogs found");
    }

    successResponse(res, {
      statusCode: 201,
      message: "Blog created successfully",
      payload: {
        findEdBlog,
      },
    });
  } catch (error) {
    next(error);
  }
};
