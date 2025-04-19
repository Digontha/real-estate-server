import { createError } from "@/config";
import Team from "@/models/team.medel";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleFindTeam = async (
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

    const findEdTeam = await Team.find(filter)
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 });
    

    const totalCount = await Team.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limitNumber);

    const prevPage = pageNumber > 1 ? pageNumber - 1 : null;
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;

    if (!findEdTeam || findEdTeam.length === 0) {
      throw createError(404, "No blogs found");
    }

    successResponse(res, {
      statusCode: 201,
      message: "Blog created successfully",
      payload: {
        findEdTeam,
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
