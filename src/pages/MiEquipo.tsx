import { motion } from "framer-motion";
import { ArrowLeft, Shield, Users, Star, MapPin, Calendar, Edit, Trash2, Plus, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const players = [
  { id: 1, name: "Pablo García", position: "Portero", number: 1, age: 12, goals: 0, assists: 0, rating: 7.8 },
  { id: 2, name: "Lucas Martín", position: "Defensa", number: 3, age: 11, goals: 2, assists: 5, rating: 8.1 },
  { id: 3, name: "Andrés López", position: "Defensa", number: 4, age: 12, goals: 1, assists: 3, rating: 7.5 },
  { id: 4, name: "Mario Fernández", position: "Defensa", number: 5, age: 11, goals: 0, assists: 2, rating: 7.2 },
  { id: 5, name: "Diego Torres", position: "Centrocampista", number: 8, age: 12, goals: 8, assists: 12, rating: 8.9 },
  { id: 6, name: "Alejandro Ruiz", position: "Centrocampista", number: 10, age: 12, goals: 15, assists: 8, rating: 9.2 },
  { id: 7, name: "Carlos Navarro", position: "Centrocampista", number: 6, age: 11, goals: 3, assists: 7, rating: 7.9 },
  { id: 8, name: "Sergio Díaz", position: "Delantero", number: 9, age: 12, goals: 22, assists: 4, rating: 9.0 },
  { id: 9, name: "Nicolás Moreno", position: "Delantero", number: 11, age: 11, goals: 14, assists: 6, rating: 8.5 },
  { id: 10, name: "Raúl Jiménez", position: "Centrocampista", number: 14, age: 12, goals: 5, assists: 9, rating: 8.3 },
];

const teamStats = [
  { label: "Jugadores", value: "10", icon: Users },
  { label: "Goles", value: "70", icon: Award },
  { label: "Media edad", value: "11.6", icon: Calendar },
  { label: "Rating", value: "8.2", icon: Star },
];

const MiEquipo = () => {
  const navigate = useNavigate();

  const positionColor = (pos: string) => {
    if (pos === "Portero") return "bg-accent/10 text-accent";
    if (pos === "Defensa") return "bg-primary/10 text-primary";
    if (pos === "Centrocampista") return "bg-pulse/10 text-pulse";
    return "bg-accent/10 text-accent";
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Mi Equipo
            </h1>
            <p className="text-xs text-muted-foreground font-display">CD Martínez Academy · Benjamín A</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-6 mt-4">
        {/* Team stats */}
        <div className="grid grid-cols-4 gap-2">
          {teamStats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-3 text-center">
              <s.icon className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[9px] font-display text-muted-foreground uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Add player */}
        <Button className="w-full bg-gradient-neon text-primary-foreground font-display font-bold py-5 rounded-xl gap-2 glow-green">
          <Plus className="w-4 h-4" /> Añadir jugador
        </Button>

        {/* Player list */}
        <div>
          <h2 className="text-lg font-display font-bold text-foreground mb-3">Plantilla</h2>
          <div className="space-y-2">
            {players.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-foreground text-sm">
                  {p.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-display font-semibold text-foreground">{p.name}</h3>
                    <span className={`px-2 py-0.5 text-[10px] font-display font-semibold rounded-full ${positionColor(p.position)}`}>
                      {p.position}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                    <span>{p.age} años</span>
                    <span>⚽ {p.goals}</span>
                    <span>🅰️ {p.assists}</span>
                    <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-primary fill-primary" />{p.rating}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors">
                    <Edit className="w-3 h-3 text-muted-foreground" />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MiEquipo;
