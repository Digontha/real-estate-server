import { IProperty } from "@/types/property.interface";
import { model, Schema } from "mongoose";

const isValidUrl = (url: string) => {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
};

const propertySchema = new Schema<IProperty>(
  {
    name: { type: String, required: false, trim: true },
    location: { type: String, required: true },
    image: {
      type: [String],
      required: true,
      validate: [(url: string) => isValidUrl(url), 'Invalid URL in images array'],
    },
    description: { type: String, required: true },
    details: {
      type: [{
        label: { type: String, required: true },
        value: {type: String,required: true}
      }],
      required: true
    },
    price: { type: String, required: true },
    sale :{
      type: String,
      enum: ['rent', 'buy'], 
      required: false
    },
    video: {
      type: String,
      required: true,
      validate: {
        validator: isValidUrl,
        message: (props:any) => `${props.value} is not a valid URL!`,
      },
    },
    slug:{ type: String, required: true, unique: true },
    type: { 
      type: String,
      enum: ['house', 'apartment', 'condo', 'townhouse'], 
      required: false
    }
  },

  { timestamps: true }
);

const Property = model<IProperty>("Property", propertySchema);

export default Property;

// name
// location
// image
// description
// details 
// video*

// //
