import { motion, AnimatePresence } from "framer-motion";
import { Zap, TrendingUp, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const pulseItems = [
  { id: 1, type: "inscripcion", text: "CF Barcelona Atlètic se inscribió en Costa Daurada Cup", time: "Hace 2 min", icon: Zap },
  { id: 2, type: "trending", text: "Pirineos Cup 2026 trending — 85% plazas cubiertas", time: "Hace 5 min", icon: TrendingUp },
  { id: 3, type: "nuevo", text: "Nuevo torneo: Mediterranean Youth Cup · Mallorca", time: "Hace 12 min", icon: Clock },
  { id: 4, type: "inscripcion", text: "AD Alcorcón Base se inscribió en Madrid Youth Cup", time: "Hace 15 min", icon: Zap },
];

const LivePulse = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pulseItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = pulseItems[currentIndex];

  return (
    <div className="glass rounded-xl px-4 py-3 overflow-hidden">
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
