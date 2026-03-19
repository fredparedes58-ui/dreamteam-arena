import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Calendar, MapPin, CheckCircle, Clock, XCircle, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useMyRegistrations } from "@/hooks/use-registrations";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const statusConfig: Record<string, { label: string; icon: typeof CheckCircle; color: string; bg: string }> = {
  confirmed: { label: "Confirmada", icon: CheckCircle, color: "text-primary", bg: "bg-primary/10" },
  pending: { label: "Pendiente", icon: Clock, color: "text-pulse", bg: "bg-pulse/10" },
  cancelled: { label: "Cancelada", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
  rejected: { label: "Rechazada", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
};

const Inscripciones = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: registrations, isLoading } = useMyRegistrations(user?.id || "");

  const confirmed = registrations?.filter((r) => r.status === "confirmed") || [];
  const pending = registrations?.filter((r) => r.status === "pending") || [];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" /> Mis Inscripciones
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-4 space-y-3">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Confirmadas", value: confirmed.length, color: "text-primary" },
            { label: "Pendientes", value: pending.length, color: "text-pulse" },
            { label: "Total", value: registrations?.length ?? 0, color: "text-accent" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-3 text-center">
              <p className={`text-xl font-display font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] font-display text-muted-foreground uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
        ) : !registrations || registrations.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-display">No tienes inscripciones aún.</p>
            <button onClick={() => navigate("/torneos")} className="text-sm text-primary font-display font-semibold mt-2 hover:underline">
              Explorar torneos →
            </button>
          </div>
        ) : (
          registrations.map((reg: any, i: number) => {
            const st = statusConfig[reg.status] || statusConfig.pending;
            const tournament = reg.tournaments;
            const team = reg.teams;
            const dateStr = tournament?.start_date
              ? format(new Date(tournament.start_date), "d MMM yyyy", { locale: es })
              : "";

            return (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => tournament && navigate(`/torneo/${tournament.id}`)}
              >
                <div className="flex gap-4 p-4">
                  <img src={tournament?.image_url || "/placeholder.svg"} alt={tournament?.name || ""} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-display font-bold text-foreground truncate">{tournament?.name || "Torneo"}</h3>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {tournament?.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-accent" />{tournament.location}</span>}
                      {dateStr && <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-accent" />{dateStr}</span>}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-display font-semibold rounded-full ${st.bg} ${st.color}`}>
                        <st.icon className="w-3 h-3" /> {st.label}
                      </span>
                      {team && <span className="text-[10px] text-muted-foreground">Equipo: {team.name}</span>}
                    </div>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">
                      Registrado: {format(new Date(reg.created_at), "d MMM yyyy", { locale: es })}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Inscripciones;
