import { motion } from "framer-motion";
import { Trophy, MapPin, TrendingUp, Calendar } from "lucide-react";

const stats = [
  { icon: Trophy, value: "12", label: "Torneos esta semana", color: "text-primary" },
  { icon: MapPin, value: "8", label: "Ciudades activas", color: "text-accent" },
  { icon: TrendingUp, value: "94%", label: "Tasa de ocupación", color: "text-primary" },
  { icon: Calendar, value: "Jun", label: "Temporada alta", color: "text-pulse" },
];

const QuickStats = () => {
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
