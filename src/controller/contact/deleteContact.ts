import { createError } from "@/config";
import Contact from "@/models/contact.model";
import { successResponse } from "@/utils/response";
import { NextFunction,Request,Response } from "express";

export const handleDeleteContact= async (req:Request ,res:Response ,next:NextFunction)=>{
      try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
          throw createError(404, "Contact  not found");
        }
        successResponse(res, {
          statusCode: 200,
          message: "Contact  deleted successfully",
          payload: deletedContact,
        });
      } catch (error) {
        next(error);
        
      }
}