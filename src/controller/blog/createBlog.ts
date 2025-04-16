import { createError } from "@/config";
import Blog from "@/models/blog.model";
import { generateSlug } from "@/services";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleCreateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, displayText, image, description,seoDescription,keyword } = req.body;
    if (!name || !displayText || !image || !description) {
      throw createError(400, "Data not provided");
    }
    const slug = generateSlug(name) + Date.now();
    const newBlog = await Blog.create({
      name,
      image,
      description,
      slug,
      displayText,
      seoDescription,
      keyword
      
    });
    successResponse(res, {
      statusCode: 201,
      message: "Blog created successfully",
      payload: newBlog,
    });
  } catch (error) {
    next(error);
  }
};
