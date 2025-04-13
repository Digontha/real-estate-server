import { createError } from "@/config";
import Property from "@/models/property.model";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleFindSingleProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const property = await Property.findOne({ id });
    if (!property) {
      throw createError(404, "No properties found");
    }
    
    successResponse(res, {
      statusCode: 200,
      message: "Countries fetched successfully",
      payload: {
        data: property,
      },
    });
  } catch (error) {
    next(error);
  }
};
