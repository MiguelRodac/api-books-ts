import { NextFunction, Request, Response } from "express";
import { ApiError } from "../shared/utils/handlers/errorHandler";
import { errorHandler } from "../shared/utils/handlers/errorHandler";
import { Logger } from "../shared/utils/logger";

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log del error (puedes personalizar esto)
  console.error("Error:", error);

  // Manejar errores conocidos
  if (error instanceof ApiError) {
    Logger.error(error.message, { statusCode: error.statusCode }); // Loguear el error específico
    return errorHandler(res, error);
  }

  Logger.error("Unexpected error", error); // Loguear el error desconocido
  // Manejar otros tipos de errores
  const unknownError = new ApiError(
    500,
    "Internal server error",
    process.env.NODE_ENV === "development"
      ? error.stack
      : `INTERNAL_ERROR - ERROR: ${error}`
  );

  return errorHandler(res, unknownError);
};
