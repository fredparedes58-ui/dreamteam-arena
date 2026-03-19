import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trophy, Users, TrendingUp, Calendar, Eye, Edit, BarChart3, ArrowLeft, Clock, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOrganizerTournaments, useCreateTournament } from "@/hooks/use-tournaments";
import { useTournamentRegistrations } from "@/hooks/use-registrations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tournamentSchema, type TournamentInput } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import BottomNav from "@/components/BottomNav";

const Club = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const { data: tournaments, isLoading } = useOrganizerTournaments(user?.id || "");
  const createMutation = useCreateTournament();

  const form = useForm<TournamentInput>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: { name: "", location: "", category: "", price: 0, max_teams: 16, start_date: "", description: "" },
  });

  const onSubmit = (values: TournamentInput) => {
    if (!user) return;
    createMutation.mutate(
      { input: values, organizerId: user.id },
      { onSuccess: () => { setShowForm(false); form.reset(); } }
    );
  };

  const activeTournaments = tournaments?.filter((t) => t.status !== "draft" && t.status !== "cancelled") || [];
  const totalTeams = tournaments?.reduce((a, t) => a + (t.current_teams ?? 0), 0) ?? 0;
  const totalRevenue = tournaments?.reduce((a, t) => a + (t.current_teams ?? 0) * (t.price ?? 0), 0) ?? 0;

  const stats = [
    { label: "Torneos activos", value: String(activeTournaments.length), icon: Trophy, color: "text-primary" },
    { label: "Equipos inscritos", value: String(totalTeams), icon: Users, color: "text-accent" },
    { label: "Ingresos totales", value: `€${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-primary" },
    { label: "Total torneos", value: String(tournaments?.length ?? 0), icon: Calendar, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">Panel de Club</h1>
            <p className="text-xs text-muted-foreground font-display">Gestiona tus torneos</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-6 mt-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] font-display text-muted-foreground uppercase mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Create button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button onClick={() => setShowForm(!showForm)} className="w-full bg-gradient-neon text-primary-foreground font-display font-bold py-6 rounded-xl text-base glow-green gap-2">
            <Plus className="w-5 h-5" /> Crear nuevo torneo
          </Button>
        </motion.div>

        {/* Create form */}
        {showForm && (
          <motion.form onSubmit={form.handleSubmit(onSubmit)} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-display font-bold text-foreground">Nuevo torneo</h2>
            {[
              { name: "name" as const, label: "Nombre del torneo", placeholder: "Ej: Summer Cup 2026", type: "text" },
              { name: "location" as const, label: "Ubicación", placeholder: "Ciudad, País", type: "text" },
              { name: "category" as const, label: "Categoría", placeholder: "Benjamín / Alevín / Infantil...", type: "text" },
              { name: "price" as const, label: "Precio por equipo (€)", placeholder: "195", type: "number" },
              { name: "max_teams" as const, label: "Máximo de equipos", placeholder: "32", type: "number" },
              { name: "start_date" as const, label: "Fecha inicio", placeholder: "", type: "date" },
              { name: "end_date" as const, label: "Fecha fin", placeholder: "", type: "date" },
            ].map((field) => (
              <div key={field.name}>
                <Label className="text-xs font-display text-muted-foreground">{field.label}</Label>
                <Input type={field.type} placeholder={field.placeholder} {...form.register(field.name)} className="mt-1" />
                {form.formState.errors[field.name] && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors[field.name]?.message}</p>
                )}
              </div>
            ))}
            <div>
              <Label className="text-xs font-display text-muted-foreground">Descripción</Label>
              <Textarea rows={3} placeholder="Describe tu torneo..." {...form.register("description")} className="mt-1" />
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1 font-display">Cancelar</Button>
              <Button type="submit" disabled={createMutation.isPending} className="flex-1 bg-gradient-neon text-primary-foreground font-display font-bold glow-green">
                {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publicar torneo"}
              </Button>
            </div>
          </motion.form>
        )}

        {/* Tournament list */}
        <div>
          <h2 className="text-lg font-display font-bold text-foreground mb-3">Mis torneos</h2>
          {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
          ) : !tournaments || tournaments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8 font-display">No tienes torneos creados aún.</p>
          ) : (
            <div className="space-y-3">
              {tournaments.map((t, i) => {
                const fill = t.max_teams ? ((t.current_teams ?? 0) / t.max_teams) * 100 : 0;
                const revenue = (t.current_teams ?? 0) * (t.price ?? 0);
                const statusLabel = t.status === "draft" ? "Borrador" : t.status === "active" ? "Activo" : t.status === "live" ? "En vivo" : t.status === "completed" ? "Finalizado" : t.status;
                const statusColor = t.status === "draft" ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary";
                return (
                  <motion.div key={t.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="glass rounded-xl p-4">
                    <div className="flex gap-4">
                      <img src={t.image_url || "/placeholder.svg"} alt={t.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-bold text-foreground text-sm truncate">{t.name}</h3>
                          <span className={`px-2 py-0.5 text-[10px] font-display font-semibold rounded-full ${statusColor}`}>{statusLabel}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{t.start_date ? format(new Date(t.start_date), "d MMM", { locale: es }) : "TBD"}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{t.current_teams ?? 0}/{t.max_teams ?? 16}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-display font-bold text-primary">€{revenue.toLocaleString()}</span>
                          <div className="flex gap-1">
                            <button onClick={() => navigate(`/torneo/${t.id}`)} className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${fill}%` }} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Club;
