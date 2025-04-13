import { Document } from "mongoose";

export interface IProperty extends Document {
  name: string;
  location: string;
  image: string[];
  description: string;
  details:{
    label: string;
    value: string;
  }[];
  video: string;
  slug: string;
  type?: string;
  price: string;
  sale?: string; 
}