import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(128),
});

export const signupSchema = loginSchema.extend({
  displayName: z.string().trim().min(2, "Mínimo 2 caracteres").max(100),
});

export const tournamentSchema = z.object({
  name: z.string().trim().min(3, "Mínimo 3 caracteres").max(200),
  description: z.string().trim().max(2000).optional(),
  location: z.string().trim().min(2).max(200),
  category: z.string().trim().min(2).max(50),
  format: z.string().trim().max(100).optional(),
  price: z.coerce.number().min(0).max(100000),
  max_teams: z.coerce.number().int().min(2).max(512),
  start_date: z.string().min(1, "Fecha requerida"),
  end_date: z.string().optional(),
  rules: z.array(z.string()).optional(),
  included: z.array(z.string()).optional(),
});

export const teamSchema = z.object({
  name: z.string().trim().min(2, "Mínimo 2 caracteres").max(100),
  category: z.string().trim().max(50).optional(),
  city: z.string().trim().max(100).optional(),
  description: z.string().trim().max(500).optional(),
});

export const playerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  position: z.enum(["portero", "defensa", "centrocampista", "delantero"]),
  number: z.coerce.number().int().min(1).max(99).optional(),
  age: z.coerce.number().int().min(4).max(99).optional(),
});

export const profileSchema = z.object({
  display_name: z.string().trim().min(2).max(100),
  location: z.string().trim().max(200).optional(),
  bio: z.string().trim().max(500).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type TournamentInput = z.infer<typeof tournamentSchema>;
export type TeamInput = z.infer<typeof teamSchema>;
export type PlayerInput = z.infer<typeof playerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
