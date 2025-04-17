

// import { isLogin } from "@/middlewares/auth.middleware";
import { handleCreateProperty } from "@/controller/property/createProperty";
import { handleFindProperty } from "@/controller/property/findProperty";
import { handleFindSingleProperty } from "@/controller/property/findSingleProperty";
import { handleUpdateProperty } from "@/controller/property/updateProperty";
import { isLogin } from "@/middlewares/auth.middleware";
import validateRequest from "@/validators";
import { validateCreateProperty } from "@/validators/property.validator";
import { Router } from "express";
const propertyRouter: Router = Router();

propertyRouter.post(
  "/create", 
  isLogin, 
  validateRequest(validateCreateProperty), 
  handleCreateProperty
);

propertyRouter.get(
  "/find", 
  handleFindProperty
);

propertyRouter.get(
  "/find/:slug", 
  handleFindSingleProperty
);

propertyRouter.put(
  "/update/:id", 
  isLogin, 
  handleUpdateProperty
);


export default propertyRouter;