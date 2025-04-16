import { IBlog } from "@/types/blog.interface";
import { model, Schema } from "mongoose";
const isValidUrl = (url: string) => {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
};
const blogSchema = new Schema<IBlog>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    displayText: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: [String],
      required: true,
      validate: [
        (url: string) => isValidUrl(url),
        "Invalid URL in images array",
      ],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    seoDescription: {
      type: String,
      required: true,
      trim: true,
    },
    keyword:{
      type: [String],
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
  },

  { timestamps: true }
);

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;
