import { motion, AnimatePresence } from "framer-motion";
import { Zap, TrendingUp, Clock } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTournaments } from "@/hooks/use-tournaments";

const LivePulse = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { data: tournaments } = useTournaments();

  const pulseItems = useMemo(() => {
    if (!tournaments?.length) return [];
    const items: { id: string; text: string; time: string; icon: typeof Zap; link: string }[] = [];

    // Live tournaments
    tournaments.filter(t => t.status === "live").forEach(t => {
      items.push({ id: `live-${t.id}`, text: `🔴 ${t.name} — EN DIRECTO desde ${t.location}`, time: "Ahora", icon: Zap, link: `/torneo/${t.id}` });
    });

    // Almost full
    tournaments.filter(t => t.status === "published" && (t.current_teams ?? 0) / (t.max_teams ?? 16) > 0.8).forEach(t => {
      const spots = (t.max_teams ?? 16) - (t.current_teams ?? 0);
      items.push({ id: `full-${t.id}`, text: `${t.name} — ¡Solo ${spots} plazas!`, time: "Trending", icon: TrendingUp, link: `/torneo/${t.id}` });
    });

    // Recent published
    tournaments.filter(t => t.status === "published").slice(0, 3).forEach(t => {
      items.push({ id: `new-${t.id}`, text: `Nuevo torneo: ${t.name} · ${t.location}`, time: "Reciente", icon: Clock, link: `/torneo/${t.id}` });
    });

    return items.slice(0, 8);
  }, [tournaments]);

  useEffect(() => {
    if (pulseItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pulseItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [pulseItems.length]);

  if (!pulseItems.length) return null;

  const current = pulseItems[currentIndex % pulseItems.length];

  return (
    <div className="glass rounded-xl px-4 py-3 overflow-hidden cursor-pointer" onClick={() => navigate(current.link)}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-display font-semibold text-primary uppercase tracking-wider">Pulse en vivo</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <current.icon className="w-4 h-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-foreground truncate">{current.text}</p>
            <p className="text-xs text-muted-foreground">{current.time}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LivePulse;
