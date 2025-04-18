import { createError } from "@/config";
import Property from "@/models/property.model";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleDeleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const targetProperty = await Property.findById(id);
    if (!targetProperty) {
      throw createError(404, "No properties found");
    }
    await targetProperty.deleteOne();
    successResponse(res, {
      statusCode: 200,
      message: "Countries fetched successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};
