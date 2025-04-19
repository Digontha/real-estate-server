import { createError } from "@/config";
import Team from "@/models/team.medel";
import { successResponse } from "@/utils/response";
import { NextFunction, Request, Response } from "express";

export const handleFindSingleTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const findEdTeam = await Team.findOne({ slug });
    if (!findEdTeam) {
      throw createError(400, "Team member not found");
    }
    successResponse(res, {
      statusCode: 200,
      message: "Team member found successfully",
      payload: findEdTeam,
    });
  } catch (error) {
    next(error);
  }
};
