
import { handleCreateTeam } from "@/controller/team/createTeam";
import { handleDeleteTeam } from "@/controller/team/deleteTeam";
import { handleFindSingleTeam } from "@/controller/team/findSingleTeam";
import { handleFindTeam } from "@/controller/team/findTeam";
import { handleUpdateTeam } from "@/controller/team/updateBlog";
import { isLogin } from "@/middlewares/auth.middleware";
import validateRequest from "@/validators";
import { validateCreateTeam } from "@/validators/team.validator";
import { Router } from "express";

const teamRouter: Router = Router();

teamRouter.post(
  "/create", 
  isLogin, 
  validateRequest(validateCreateTeam), 
  handleCreateTeam
);
teamRouter.get(
  "/find", 
  handleFindTeam
);
teamRouter.get(
  "/find/:slug", 
  handleFindSingleTeam
);
teamRouter.put(
  "/update/:id", 
  isLogin,
  handleUpdateTeam
);
teamRouter.delete(
  "/delete/:id", 
  isLogin,
  handleDeleteTeam 
);



export default teamRouter;