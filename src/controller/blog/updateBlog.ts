
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
    const {newName,newDescription,newImage,newDisplayText,newSeoDescription,newKeyword} = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
        throw createError(404, "Blog not found");
    }
    if(newName) blog.name = newName || blog.name;
    if(newDescription) blog.description = newDescription||blog.description;
    if(newImage) blog.image = Array.isArray(newImage) ? newImage : [newImage];
    if(newDisplayText) blog.displayText = newDisplayText||blog.displayText;
    if(newSeoDescription) blog.seoDescription = newSeoDescription||blog.seoDescription;
    if(newKeyword) blog.keyword = Array.isArray(newKeyword) ? newKeyword : [newKeyword];
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