
import { createError } from "@/config";
import Property from "@/models/property.model";
import { successResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const handleFindProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
     const {name,page=1,limit=10,location,type,sale,minPrice,maxPrice} = req.query;
     const pageNumber = parseInt(page as string, 10);
     const limitNumber = parseInt(limit as string, 10);
 
     if (pageNumber < 1 || limitNumber < 1) {
       throw createError(400, "Invalid page or limit");
     }
 
     const skip = (pageNumber - 1) * limitNumber;
 
     const filter: any = {};
     if (name) filter.name = { $regex: name, $options: "i" };
     if(location) filter.location = { $regex: location, $options: "i" };
     if (type) filter.type = type;
     if (sale) filter.sale = sale;

     if (minPrice || maxPrice) {
       filter.price = {};
       if (minPrice) filter.price.$gte = Number(minPrice);
       if (maxPrice) filter.price.$lte = Number(maxPrice);
     }
     const properties = await Property.find(filter)
       .skip(skip)
       .limit(limitNumber)
       .sort({ createdAt: -1 });
 
     const totalCount = await Property.countDocuments(filter);
     const totalPages = Math.ceil(totalCount / limitNumber);
 
     const prevPage = pageNumber > 1 ? pageNumber - 1 : null;
     const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;
 
     if (!properties || properties.length === 0) {
       throw createError(404, "No properties found");
     }
     successResponse(res, {
        statusCode: 200,
        message: "Countries fetched successfully",
        payload: {
          data: properties,
          pagination: {
            totalPages,
            currentPage: pageNumber,
            prevPage,
            nextPage,
            totalCount,
            limit: limitNumber,
            skip,
            dataPerPage: limitNumber,
            hasNextPage: nextPage !== null,
            hasPreviousPage: prevPage !== null,
            hasMoreItems: skip + limitNumber < totalCount,
            hasLessItems: skip > 0,
          },
        },
      });
  } catch (error) {
    next(error);
  }
};
