import { Document } from "mongoose";

export interface ITeam extends Document {
    name: string;
    designation: string;
    image: string;
    slug: string;
 
}