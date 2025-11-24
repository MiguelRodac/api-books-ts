import { Response } from "express";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errorData?: any
  ) {
    super(message);
  }
}

export const errorHandler = (res: Response, error: ApiError) => {
  res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    data: error.errorData,
  });
};
