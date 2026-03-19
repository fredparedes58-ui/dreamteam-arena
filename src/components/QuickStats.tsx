import { motion } from "framer-motion";
import { Trophy, MapPin, TrendingUp, Calendar } from "lucide-react";
import { useTournaments } from "@/hooks/use-tournaments";

const QuickStats = () => {
  const { data: tournaments } = useTournaments();

  const all = tournaments ?? [];
  const totalActive = all.filter(t => t.status !== "draft" && t.status !== "cancelled").length;
  const cities = new Set(all.map(t => t.location?.split(",")[0]?.trim()).filter(Boolean)).size;
  const totalTeams = all.reduce((sum, t) => sum + (t.current_teams ?? 0), 0);
  const totalSlots = all.reduce((sum, t) => sum + (t.max_teams ?? 0), 0);
  const occupancy = totalSlots > 0 ? Math.round((totalTeams / totalSlots) * 100) : 0;
  const liveCount = all.filter(t => t.status === "live").length;

  const stats = [
    { icon: Trophy, value: String(totalActive), label: "Torneos activos", color: "text-primary" },
    { icon: MapPin, value: String(cities), label: "Ciudades", color: "text-accent" },
    { icon: TrendingUp, value: `${occupancy}%`, label: "Ocupación media", color: "text-primary" },
    { icon: Calendar, value: String(liveCount), label: "En directo", color: "text-pulse" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="glass rounded-xl p-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
          <div className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;
