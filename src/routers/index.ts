import { Router } from "express";
import authRouter from "./auth.router";
import propertyRouter from "./property.router";
import blogRouter from "./blog.router";
import teamRouter from "./team.router";
import contactRouter from "./contact.router";


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
  {
    path: "/blog",
    router: blogRouter,
  },
  {
    path: "/team",
    router: teamRouter,
  },
  {
    path: "/contact",
    router: contactRouter,
  },
 
];

routes.forEach((route) => {
  rootRouter.use(route.path, route.router);
});

export default rootRouter;
