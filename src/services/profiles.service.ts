import { supabase } from "@/integrations/supabase/client";
import type { ProfileInput } from "@/lib/schemas";

export const profilesService = {
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (error) throw error;
    return data;
  },

  async update(userId: string, input: ProfileInput) {
    const { data, error } = await supabase
      .from("profiles")
      .update(input)
      .eq("user_id", userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getRoles(userId: string) {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (error) throw error;
    return data?.map((r) => r.role) ?? [];
  },
};
