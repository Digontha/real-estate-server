import { createError } from "@/config";
import Property from "@/models/property.model";
import { generateSlug } from "@/services";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleCreateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, location, image, description, details, video,type ,sale,price, bedrooms,bathrooms,squareFeet } = req.body;
    if (!name || !location || !image || !description || !details || !video) {
      throw createError(400, "Data not provided");
    }
    const slug = generateSlug(name) + Date.now();
    const newProperty = await Property.create({
      name,
      location,
      image,
      description,
      details,
      video,
      slug,
      type,
      sale,
      price,
      bedrooms,
      bathrooms,
      squareFeet,
    });
    successResponse(res, {
      statusCode: 201,
      message: "Property created successfully",
      payload: newProperty,
    });
  } catch (error) {
    next(error);
  }
};
