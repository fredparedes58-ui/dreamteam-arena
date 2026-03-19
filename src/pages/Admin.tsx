import { motion } from "framer-motion";
import { ArrowLeft, Shield, Users, Trophy, BarChart3, AlertTriangle, CheckCircle, XCircle, Eye, Ban, TrendingUp, Activity, Globe, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTournaments, useUpdateTournamentStatus } from "@/hooks/use-tournaments";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const tabs = ["Overview", "Usuarios", "Torneos"];

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const qc = useQueryClient();

  // Fetch all tournaments
  const { data: allTournaments, isLoading: tournamentsLoading } = useTournaments();

  // Fetch all profiles
  const { data: allProfiles, isLoading: profilesLoading } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(20);
      if (error) throw error;
      return data;
    },
  });

  // Fetch all registrations count
  const { data: registrations } = useQuery({
    queryKey: ["admin-registrations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("registrations").select("id");
      if (error) throw error;
      return data;
    },
  });

  const updateStatusMutation = useUpdateTournamentStatus();

  const updateVerification = useMutation({
    mutationFn: async ({ profileId, status }: { profileId: string; status: string }) => {
      const { error } = await supabase.from("profiles").update({ verification_status: status as any }).eq("id", profileId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-profiles"] });
      toast.success("Estado de verificación actualizado");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const draftTournaments = allTournaments?.filter((t) => t.status === "draft") || [];
  const activeTournaments = allTournaments?.filter((t) => t.status === "active" || t.status === "live" || t.status === "published") || [];
  const totalRevenue = allTournaments?.reduce((a, t) => a + (t.current_teams ?? 0) * (t.price ?? 0), 0) ?? 0;

  const overviewStats = [
    { label: "Usuarios totales", value: String(allProfiles?.length ?? 0), icon: Users, color: "text-primary" },
    { label: "Torneos activos", value: String(activeTournaments.length), icon: Trophy, color: "text-accent" },
    { label: "Inscripciones", value: String(registrations?.length ?? 0), icon: TrendingUp, color: "text-primary" },
    { label: "Borradores", value: String(draftTournaments.length), icon: AlertTriangle, color: "text-pulse" },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-display font-bold text-foreground">Admin Panel</h1>
          </div>
          <span className="ml-auto px-2 py-1 text-[10px] font-display font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">SUPER ADMIN</span>
        </div>
        <div className="flex gap-1 overflow-x-auto scrollbar-none pb-2">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-xs font-display font-semibold whitespace-nowrap transition-all ${activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-6 mt-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {overviewStats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] font-display text-muted-foreground uppercase mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Users tab */}
        {(activeTab === "Overview" || activeTab === "Usuarios") && (
          <div className="glass rounded-xl p-4">
            <h2 className="text-sm font-display font-bold text-foreground mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" /> Usuarios recientes
            </h2>
            {profilesLoading ? (
              <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 text-primary animate-spin" /></div>
            ) : (
              <div className="space-y-2">
                {allProfiles?.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-display font-semibold text-foreground">{p.display_name}</p>
                        <p className="text-[10px] text-muted-foreground">{p.location || "Sin ubicación"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-display font-semibold rounded-full ${p.verification_status === "verified" ? "bg-primary/10 text-primary" : p.verification_status === "rejected" ? "bg-destructive/10 text-destructive" : "bg-pulse/10 text-pulse"}`}>
                        {p.verification_status === "verified" ? "Verificado" : p.verification_status === "rejected" ? "Rechazado" : "Pendiente"}
                      </span>
                      {p.verification_status !== "verified" && (
                        <button onClick={() => updateVerification.mutate({ profileId: p.id, status: "verified" })} className="w-6 h-6 rounded bg-secondary flex items-center justify-center hover:bg-primary/10">
                          <CheckCircle className="w-3 h-3 text-primary" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tournaments tab */}
        {(activeTab === "Overview" || activeTab === "Torneos") && (
          <div className="glass rounded-xl p-4">
            <h2 className="text-sm font-display font-bold text-foreground mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" /> Torneos (borrador → publicar)
            </h2>
            {tournamentsLoading ? (
              <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 text-primary animate-spin" /></div>
            ) : draftTournaments.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4 font-display">🎉 No hay torneos pendientes de aprobación</p>
            ) : (
              <div className="space-y-2">
                {draftTournaments.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-lg glass border border-border/30">
                    <div>
                      <p className="text-xs font-display font-bold text-foreground">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.category} · {t.location}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => updateStatusMutation.mutate({ id: t.id, status: "published" })} className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      </button>
                      <button onClick={() => updateStatusMutation.mutate({ id: t.id, status: "cancelled" })} className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center hover:bg-destructive/20">
                        <Ban className="w-3.5 h-3.5 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
