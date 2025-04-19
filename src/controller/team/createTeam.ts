import { createError } from "@/config";
import Team from "@/models/team.medel";
import { generateSlug } from "@/services";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleCreateTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, designation, image } = req.body;
    if (!name || !designation || !image) {
      throw createError(400, "All data not provided");
    }
    const slug = generateSlug(name) + Date.now();
    const newTeam = await Team.create({
      name,
      designation,
      image,
      slug,
    });
    successResponse(res, {
      statusCode: 201,
      message: "Team member created successfully",
      payload: newTeam,
    });
  } catch (error) {
    next(error);
  }
};
