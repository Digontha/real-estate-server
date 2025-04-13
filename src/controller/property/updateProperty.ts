import { createError } from "@/config";
import Property from "@/models/property.model";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleUpdateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      name,
      location,
      image,
      description,
      details,
      video,
      type,
      sale,
      price,
      bedrooms,
      bathrooms,
      squareFeet
    } = req.body;


    const property = await Property.findById(id);
    if (!property) {
      throw createError(404, "Property not found");
    }

    const updateData: Record<string, any> = {};

    if (name !== undefined) updateData.name = name;
    if (location !== undefined) updateData.location = location;
    if (image !== undefined) {
      updateData.image = Array.isArray(image) ? image : [image];
    }
    if (description !== undefined) updateData.description = description;
    if (video !== undefined) updateData.video = video;
    if (type !== undefined) updateData.type = type;
    if (sale !== undefined) updateData.sale = sale;
    if (price !== undefined) updateData.price = price;
    if (bedrooms !== undefined) updateData.bedrooms = bedrooms;
    if (bathrooms !== undefined) updateData.bathrooms = bathrooms;
    if (squareFeet !== undefined) updateData.squareFeet = squareFeet;

    if (details !== undefined) {
      if (Array.isArray(details)) {
        updateData.details = details;
      } else {
        const existingDetails = property.details || [];
        updateData.details = [...existingDetails, ...(Array.isArray(details) ? details : [details])];
      }
    }



    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } 
    );

    if (!updatedProperty) {
      throw createError(500, "Failed to update property");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Property updated successfully",
      payload: updatedProperty,
    });

  } catch (error) {
    next(error);
  }
};