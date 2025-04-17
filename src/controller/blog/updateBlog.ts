import { createError } from "@/config";
import Blog from "@/models/blog.model";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleUpdateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {name,description,image,displayText,seoDescription,keyword} = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
        throw createError(404, "Blog not found");
    }
    if(name) blog.name = name || blog.name;
    if(description) blog.description = description||blog.description;
    if(image) blog.image = Array.isArray(image) ? image : [image];
    if(displayText) blog.displayText = displayText||blog.displayText;
    if(seoDescription) blog.seoDescription = seoDescription||blog.seoDescription;
    if(keyword) blog.keyword = Array.isArray(keyword) ? keyword : [keyword];
    const updatedBlog = await blog.save();

    successResponse(res, {
      statusCode: 200,
      message: "Blog updated successfully",
      payload: updatedBlog,
    });

  } catch (error) {
    next(error);
  }
};