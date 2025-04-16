import { createError } from "@/config";
import Blog from "@/models/blog.model";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleDeleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const targetBlog = await Blog.findById(id);
    if (!targetBlog) {
      throw createError(404, "No blogs found");
    }
    await targetBlog.deleteOne();
    successResponse(res, {
      statusCode: 200,
      message: "Blog deleted successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};
