import { Router } from "express";
import authRouter from "./auth.router";
import propertyRouter from "./property.router";


const rootRouter: Router = Router();

const routes = [
 
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/property",
    router: propertyRouter,
  },
 
];

routes.forEach((route) => {
  rootRouter.use(route.path, route.router);
});

export default rootRouter;
