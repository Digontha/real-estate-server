import { handleCreateBlog } from "@/controller/blog/createBlog";
import { handleDeleteBlog } from "@/controller/blog/deleteBlog";
import { handleFindBlog } from "@/controller/blog/findBlog";
import { handleFindSingleBlog } from "@/controller/blog/findSingleBlog";
import { handleUpdateBlog } from "@/controller/blog/updateBlog";
import { isLogin } from "@/middlewares/auth.middleware";
import validateRequest from "@/validators";
import { validateCreateBlog } from "@/validators/blog.validator";
import { Router } from "express";

const blogRouter: Router = Router();

blogRouter.post(
  "/create", 
  isLogin, 
  validateRequest(validateCreateBlog), 
  handleCreateBlog
);
blogRouter.get(
  "/find", 
  isLogin, 
  handleFindBlog
);
blogRouter.get(
  `/find/:slug`, 
  isLogin, 
  handleFindSingleBlog
);

blogRouter.put(
  `/update/:id`, 
  isLogin,  
  handleUpdateBlog
);
blogRouter.delete(
  `/delete/:id`, 
  isLogin, 
  handleDeleteBlog
);



export default blogRouter;