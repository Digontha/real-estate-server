import { createError } from "@/config";
import Contact from "@/models/contact.model";
import { successResponse } from "@/utils/response";
import { NextFunction, Request, Response } from "express";

export const handleSendContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phone, email, message, city } = req.body;
    if (!name || !email || !message || !city || !phone) {
      throw createError(401, "Please fill all the fields");
    }
    const newContact = await Contact.create({
      name,
      phone,
      email,
      message,
      city,
    });

    successResponse(res, {
      statusCode: 201,
      message: "Contact message sent successfully",
      payload: newContact,
    });
    
  } catch (error) {
    next(error);
  }
};
