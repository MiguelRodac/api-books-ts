import { z } from "zod";

// Validations
export const AuthorSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Debe ser un email válido"),
  bio: z.string().optional(),
});

// DTO
export type AuthorCreateDTO = z.infer<typeof AuthorSchema>;

// Partial
export const AuthorUpdateSchema = AuthorSchema.partial();
export type AuthorUpdateDTO = z.infer<typeof AuthorUpdateSchema>;
