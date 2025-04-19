import { Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  phone: string;
  email: string;
  message: string;
  city: string;
  isRead: boolean;
  isImportant: boolean;
}
