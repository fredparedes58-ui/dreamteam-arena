import { supabase } from "@/integrations/supabase/client";
import type { RegistrationStatus } from "@/types/domain";

export const registrationsService = {
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from("registrations")
      .select("*, tournaments(*), teams(name, logo_url)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getByTournament(tournamentId: string) {
    const { data, error } = await supabase
      .from("registrations")
      .select("*, teams(name, logo_url, city)")
      .eq("tournament_id", tournamentId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(tournamentId: string, teamId: string, userId: string) {
    const { data, error } = await supabase
      .from("registrations")
      .insert([{ tournament_id: tournamentId, team_id: teamId, user_id: userId }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: RegistrationStatus) {
    const { data, error } = await supabase
      .from("registrations")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
