import { Response } from 'express';

export const successHandler = (
  res: Response,
  data: any,
  message: string,
  statusCode: number
) => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data
  });
};