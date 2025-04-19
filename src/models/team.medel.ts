
import { ITeam } from "@/types/team.interface";
import { model, Schema } from "mongoose";

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation:{
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        validate: [
            (url: string) => {
            const regex = /^(ftp|http|https):\/\/[^ "]+$/;
            return regex.test(url);
            },
            "Invalid URL in images array",
        ],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
  },

  { timestamps: true }
);

const Team = model<ITeam>("team", teamSchema);

export default Team;
