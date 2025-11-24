import { Response } from 'express';
import { successHandler } from './successHandler';
import { errorHandler, ApiError } from './errorHandler';

export const responseHandler = <T>(
  res: Response,
  serviceResponse: {
    status: number;
    message?: string;
    data?: T;
    error?: {
      message?: string;
      data?: any;
    };
  }
) => {
  if (serviceResponse.status >= 200 && serviceResponse.status < 300) {
    // Lógica del successHandler integrada
    const hasData = serviceResponse.data !== undefined && serviceResponse.data !== null && Object.keys(serviceResponse.data).length > 0;
    const message = serviceResponse.message ? serviceResponse.message : hasData ? 'Data found' : 'No data found';
    const data = hasData ? serviceResponse.data : null;

    return successHandler(res, data, message, serviceResponse.status);
  } else {
    // Lógica del errorHandler integrada
    const error = new ApiError(
      serviceResponse.status,
      serviceResponse.error?.message || 'Unknown error',
      serviceResponse.error?.data || 'Error data not found'
    );
    
    return errorHandler(res, error);
  }
};