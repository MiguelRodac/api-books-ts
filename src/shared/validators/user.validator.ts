import { z } from "zod";

export const UserSchema = z.object({
  nickname: z.string().min(2, "Nickname is required"),
  email: z.string().email("Must be a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserCreateDTO = z.infer<typeof UserSchema>;

export const UserUpdateSchema = UserSchema.partial();
export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;
