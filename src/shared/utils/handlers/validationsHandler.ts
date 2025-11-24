import { z } from 'zod';
import { ApiError } from './errorHandler';

// PDF Data Schema
export const pdfDataSchema  = z.object({
  date: z.string(),
  hours: z.string(),
  refNumber: z.string(),
  numSeq: z.string(),
  abononumber: z.string(),
  status: z.string(),
  describe: z.string(),
  amount: z.string(),
  methodPayment: z.string(),
  mac_address: z.string(),
  is_anulation: z.boolean(),
}).strict(); // .strict() asegura que no haya campos adicionales

//Upload File Schema
export const uploadFileSchema = z.object({
  pathRoute: z.string().min(1, "El campo pathRoute no puede estar vacío"),
  register: z.string().min(1, "El campo register no puede estar vacío"),
  refNum: z.string().optional(),
  typeFile: z.boolean().refine((val) => typeof val === "boolean", {message: "El campo typeFile debe ser un valor booleano",}),
  adminFile: z.boolean().optional(),
})
.strict(); // .strict() asegura que no haya campos adicionales

export const txtToPDFUpload = z.object({
  pathRoute: z.string().min(1, "El campo pathRoute no puede estar vacío"),
})

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