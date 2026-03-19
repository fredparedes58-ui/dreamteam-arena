import { supabase } from "@/integrations/supabase/client";
import type { TeamInput, PlayerInput } from "@/lib/schemas";

export const teamsService = {
  async getByOwner(ownerId: string) {
    const { data, error } = await supabase
      .from("teams")
      .select("*, players(*)")
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("teams")
      .select("*, players(*)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(input: TeamInput, ownerId: string) {
    const slug = input.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { data, error } = await supabase
      .from("teams")
      .insert([{ name: input.name, category: input.category, city: input.city, description: input.description, owner_id: ownerId, slug }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, input: Partial<TeamInput>) {
    const { data, error } = await supabase.from("teams").update(input).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("teams").delete().eq("id", id);
    if (error) throw error;
  },

  async addPlayer(input: PlayerInput, teamId: string) {
    const { data, error } = await supabase
      .from("players")
      .insert([{ name: input.name, position: input.position, number: input.number, age: input.age, team_id: teamId }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async removePlayer(playerId: string) {
    const { error } = await supabase.from("players").delete().eq("id", playerId);
    if (error) throw error;
  },
};
