import { Document } from "mongoose";

export interface IBlog extends Document {
    name: string;
    displayText: string;
    image: string[];
    description: string;
    slug: string;
    seoDescription: string;
    keyword: string[];
}