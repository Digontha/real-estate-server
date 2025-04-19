import { createError } from "@/config";
import User from "@/models/user.model";
import { findWithId } from "@/services";
import { successResponse } from "@/utils/response";
import { NextFunction,Request,Response } from "express";

export const handleGetCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return next(createError(403, "User not authenticated"));
      }
      const options = {
        password: 0,
      };
      const currentUser = await findWithId(req.user._id, User, options);
      successResponse(res, {
        message: "Fetched current user successfully",
        payload: currentUser,
      });
    } catch (error) {
      next(error);
    }
  };