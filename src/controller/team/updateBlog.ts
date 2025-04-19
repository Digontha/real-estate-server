import { createError } from "@/config";
import Team from "@/models/team.medel";
import { successResponse } from "@/utils/response";
import { NextFunction,Request,Response } from "express";

export const handleUpdateTeam = async (req:Request, res:Response, next:NextFunction) => {
      try {
        const { id } = req.params;
        const { name, designation, image } = req.body;
        const updatedTeam = await Team.findById(id);
        if (!updatedTeam) {
          throw createError(404, "Team member not found");
        }
        if (name) updatedTeam.name = name || updatedTeam.name;
        if (designation) updatedTeam.designation = designation || updatedTeam.designation;
        if (image) updatedTeam.image =  image || updatedTeam.image;
        await updatedTeam.save();
        successResponse(res, {
          statusCode: 200,
          message: "Team member updated successfully",
          payload: updatedTeam,
        });
      } catch (error) {
        next(error);
        
      }
};