import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Trophy, Filter, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTournaments } from "@/hooks/use-tournaments";
import { TournamentCardSkeleton } from "@/components/shared/Skeletons";
import { EmptyState } from "@/components/shared/EmptyState";
import type { TournamentStatus } from "@/types/domain";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const tabs: { label: string; status?: TournamentStatus }[] = [
  { label: "Próximos", status: "published" },
  { label: "En curso", status: "live" },
  { label: "Activos", status: "active" },
  { label: "Finalizados", status: "completed" },
];

const Torneos = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const navigate = useNavigate();
  const { data: tournaments, isLoading } = useTournaments(activeTab.status);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-2">
        <div className="flex items-center justify-between mb-4">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-display font-bold text-foreground">
            <Trophy className="inline w-6 h-6 text-primary mr-2" />
            Torneos
          </motion.h1>
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <div className="flex gap-1 overflow-x-auto scrollbar-none pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-display font-semibold whitespace-nowrap transition-all ${activeTab.label === tab.label ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-4 space-y-4">
        {/* Calendar strip */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
          {Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() + i);
            const day = d.toLocaleDateString("es", { weekday: "short" });
            const num = d.getDate();
            return (
              <button key={i} className={`flex flex-col items-center px-3 py-2 rounded-xl min-w-[50px] transition-all ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                <span className="text-[10px] font-display uppercase">{day}</span>
                <span className="text-lg font-display font-bold">{num}</span>
              </button>
            );
          })}
        </div>

        {/* Tournament list */}
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <TournamentCardSkeleton key={i} />)
        ) : !tournaments?.length ? (
          <EmptyState
            title="No hay torneos"
            description={`No se encontraron torneos con estado "${activeTab.label}".`}
            actionLabel="Ver todos"
            onAction={() => setActiveTab(tabs[0])}
          />
        ) : (
          tournaments.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => navigate(`/torneo/${t.id}`)}
            >
              <div className="relative h-32">
                <img src={t.image_url || "/placeholder.svg"} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                {t.status === "live" && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-pulse/20 border border-pulse/30 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-pulse animate-pulse" />
                    <span className="text-[10px] font-display font-bold text-pulse">EN VIVO</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 text-[10px] font-display font-semibold rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
                    {t.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-foreground text-sm">{t.name}</h3>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-accent" />{t.location}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-accent" />
                    {t.start_date ? format(new Date(t.start_date), "d MMM yyyy", { locale: es }) : "TBD"}
                  </span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3 text-accent" />{t.current_teams ?? 0}/{t.max_teams ?? 16}</span>
                </div>
                <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${((t.current_teams ?? 0) / (t.max_teams ?? 16)) * 100}%` }} transition={{ duration: 1 }} />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Torneos;
