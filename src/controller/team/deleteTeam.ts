import { createError } from "@/config";
import Team from "@/models/team.medel";
import { successResponse } from "@/utils/response";
import { NextFunction,Request,Response } from "express";

export const handleDeleteTeam= async (req:Request ,res:Response ,next:NextFunction)=>{
      try {
        const { id } = req.params;
        const deletedTeam = await Team.findByIdAndDelete(id);
        if (!deletedTeam) {
          throw createError(404, "Team member not found");
        }
        successResponse(res, {
          statusCode: 200,
          message: "Team member deleted successfully",
          payload: deletedTeam,
        });
      } catch (error) {
        next(error);
        
      }
}