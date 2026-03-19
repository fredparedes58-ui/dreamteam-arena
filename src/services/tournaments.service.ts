import { supabase } from "@/integrations/supabase/client";
import type { TournamentInput } from "@/lib/schemas";

export const tournamentsService = {
  async getAll(status?: string) {
    let query = supabase.from("tournaments").select("*").order("start_date", { ascending: true });
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*, profiles!tournaments_organizer_id_fkey(display_name, avatar_url, verification_status)")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getByOrganizer(organizerId: string) {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("organizer_id", organizerId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(input: TournamentInput, organizerId: string) {
    const slug = input.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { data, error } = await supabase
      .from("tournaments")
      .insert({ ...input, organizer_id: organizerId, slug, status: "draft" })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, input: Partial<TournamentInput>) {
    const { data, error } = await supabase
      .from("tournaments")
      .update(input)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from("tournaments")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async search(query: string, category?: string) {
    let q = supabase
      .from("tournaments")
      .select("*")
      .neq("status", "draft")
      .order("start_date", { ascending: true });
    if (query) q = q.or(`name.ilike.%${query}%,location.ilike.%${query}%`);
    if (category && category !== "Todos") q = q.eq("category", category);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  },
};
