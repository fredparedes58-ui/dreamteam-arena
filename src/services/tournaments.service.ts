import { supabase } from "@/integrations/supabase/client";
import type { TournamentInput } from "@/lib/schemas";
import type { TournamentStatus } from "@/types/domain";

export const tournamentsService = {
  async getAll(status?: TournamentStatus) {
    let query = supabase.from("tournaments").select("*").order("start_date", { ascending: true });
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
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
      .insert([{
        name: input.name,
        description: input.description,
        location: input.location,
        category: input.category,
        format: input.format,
        price: input.price,
        max_teams: input.max_teams,
        start_date: input.start_date,
        end_date: input.end_date,
        rules: input.rules,
        included: input.included,
        organizer_id: organizerId,
        slug,
        status: "draft" as const,
      }])
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

  async updateStatus(id: string, status: TournamentStatus) {
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
      .neq("status", "draft" as const)
      .order("start_date", { ascending: true });
    if (query) q = q.or(`name.ilike.%${query}%,location.ilike.%${query}%`);
    if (category && category !== "Todos") q = q.eq("category", category);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  },
};
