import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  published_at: z.string().optional(),
  available: z.boolean().default(true),
  id_author: z.number().int("Author ID must be a valid number"),
});

export type BookCreateDTO = z.infer<typeof BookSchema>;

export const BookUpdateSchema = BookSchema.partial();
export type BookUpdateDTO = z.infer<typeof BookUpdateSchema>;
