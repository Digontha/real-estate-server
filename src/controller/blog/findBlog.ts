import { createError } from "@/config";
import Blog from "@/models/blog.model";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleFindBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (pageNumber < 1 || limitNumber < 1) {
      throw createError(400, "Invalid page or limit");
    }
    const skip = (pageNumber - 1) * limitNumber;
    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: "i" };

    const findEdBlog = await Blog.find(filter);

    const totalCount = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limitNumber);

    const prevPage = pageNumber > 1 ? pageNumber - 1 : null;
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;

    if (!findEdBlog || findEdBlog.length === 0) {
      throw createError(404, "No blogs found");
    }

    successResponse(res, {
      statusCode: 201,
      message: "Blog created successfully",
      payload: {
        findEdBlog,
        pagination: {
          totalPages,
          currentPage: pageNumber,
          prevPage,
          nextPage,
          totalCount,
          limit: limitNumber,
          skip,
          dataPerPage: limitNumber,
          hasNextPage: nextPage !== null,
          hasPreviousPage: prevPage !== null,
          hasMoreItems: skip + limitNumber < totalCount,
          hasLessItems: skip > 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
