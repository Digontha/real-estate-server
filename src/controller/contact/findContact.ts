import { createError } from "@/config";
import Contact from "@/models/contact.model";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleFindContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      page = 1,
      limit = 10,
      email,
      isImportant,
      isRead,
    } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (pageNumber < 1 || limitNumber < 1) {
      throw createError(400, "Invalid page or limit");
    }

    const skip = (pageNumber - 1) * limitNumber;

    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (isImportant) filter.isImportant = isImportant;
    if (isRead) filter.isRead = isRead;
    const contacts = await Contact.find(filter)
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const totalCount = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limitNumber);

    const prevPage = pageNumber > 1 ? pageNumber - 1 : null;
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;

    if (!contacts || contacts.length === 0) {
      throw createError(404, "No contacts found");
    }
    successResponse(res, {
            statusCode: 200,
            message: "Countries fetched successfully",
            payload: {
              data: contacts,
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
