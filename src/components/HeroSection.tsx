import { motion } from "framer-motion";
import heroImage from "@/assets/hero-stadium.jpg";
import { Search, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Estadio futurista" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-display uppercase tracking-[0.3em] text-accent border border-accent/30 rounded-full glass">
            El marketplace del fútbol base
          </span>
        </motion.div>

        <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
          <span className="text-foreground">TORNEO</span>
          <span className="text-gradient-neon">BASE</span>
        </motion.h1>

        <motion.p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-body" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          Todos los torneos de fútbol base en un solo lugar. Encuentra, inscríbete y paga en 3 minutos.
        </motion.p>

        <motion.div className="w-full max-w-2xl glass rounded-2xl p-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl bg-background/50">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="Buscar torneo..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-body" />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-background/50">
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="Ciudad" className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-body" />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-background/50">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="Fecha" className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-body" />
            </div>
            <button onClick={() => navigate("/explorar")} className="px-6 py-3 bg-primary text-primary-foreground font-display text-sm font-semibold rounded-xl hover:brightness-110 transition-all glow-green">
              Buscar
            </button>
          </div>
        </motion.div>

        <motion.div className="flex gap-8 mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          {[
            { value: "600+", label: "Torneos" },
            { value: "8.500+", label: "Clubs" },
            { value: "450K+", label: "Jugadores" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
