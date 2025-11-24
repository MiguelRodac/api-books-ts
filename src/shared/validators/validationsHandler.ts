import { z } from 'zod';
import { ApiError } from '../utils/handlers/errorHandler';

// Validate data request function
export const validateDataRequest = (
  dataInput: unknown,
  schemaData: z.ZodType<any>
) => {
  try {
    // Validar con Zod
    const parsedData = schemaData.parse(dataInput);
    return parsedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convertir errores de Zod a ApiError
      const firstError = error.issues[0];
      throw new ApiError(422, `Error de validación: ${firstError.code}`, {
        field: firstError.path,
        error: firstError.message
      });
    }
    throw error;
  }
};