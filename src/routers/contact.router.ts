
import { handleDeleteContact } from "@/controller/contact/deleteContact";
import { handleFindContact } from "@/controller/contact/findContact";
import { handleSendContact } from "@/controller/contact/sendContact";
import { isLogin } from "@/middlewares/auth.middleware";
import validateRequest from "@/validators";
import { validateContactForm } from "@/validators/contactForm.validator";
import { Router } from "express";

const contactRouter: Router = Router();

contactRouter.post(
  "/create", 
  validateRequest(validateContactForm), 
  handleSendContact
);
contactRouter.get(
  "/find", 
  isLogin,
  handleFindContact
);
contactRouter.delete(
  "/delete/:id", 
  isLogin,
  handleDeleteContact
);




export default contactRouter;