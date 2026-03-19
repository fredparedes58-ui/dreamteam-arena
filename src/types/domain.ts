import type { Tables, Enums } from "@/integrations/supabase/types";

// Domain types derived from DB
export type Profile = Tables<"profiles">;
export type Team = Tables<"teams">;
export type Player = Tables<"players">;
export type Tournament = Tables<"tournaments">;
export type Registration = Tables<"registrations">;
export type Notification = Tables<"notifications">;
export type UserRole = Tables<"user_roles">;

// Enums re-exported
export type AppRole = Enums<"app_role">;
export type TournamentStatus = Enums<"tournament_status">;
export type RegistrationStatus = Enums<"registration_status">;
export type NotificationType = Enums<"notification_type">;
export type PlayerPosition = Enums<"player_position">;
export type VerificationStatus = Enums<"verification_status">;

// DTOs
export interface TournamentWithOrganizer extends Tournament {
  organizer?: Profile;
}

export interface RegistrationWithDetails extends Registration {
  tournament?: Tournament;
  team?: Team;
}

export interface TeamWithPlayers extends Team {
  players?: Player[];
}
