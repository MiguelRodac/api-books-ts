import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../shared/utils/handlers/errorHandler";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Token not provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    (req as any).user = decoded; // attach user payload to request
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
};
