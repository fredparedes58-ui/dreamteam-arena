import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Trophy, Filter, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import tournament1 from "@/assets/tournament-1.jpg";
import tournament2 from "@/assets/tournament-2.jpg";
import tournament3 from "@/assets/tournament-3.jpg";
import tournament4 from "@/assets/tournament-4.jpg";

const tabs = ["Próximos", "En curso", "Finalizados", "Mis inscripciones"];

const tournaments = [
  { id: 1, name: "Costa Daurada Cup 2026", location: "Salou, Tarragona", date: "15-19 Jun 2026", category: "Benjamín", teams: 52, maxTeams: 64, image: tournament1, status: "upcoming" },
  { id: 2, name: "Pirineos Youth Championship", location: "Jaca, Huesca", date: "22-25 Jul 2026", category: "Alevín", teams: 38, maxTeams: 48, image: tournament2, status: "upcoming" },
  { id: 3, name: "Mediterranean Cup", location: "Palma, Mallorca", date: "5-8 Ago 2026", category: "Infantil", teams: 20, maxTeams: 32, image: tournament3, status: "live" },
  { id: 4, name: "Madrid Night League", location: "Madrid", date: "10-12 Jul 2026", category: "Cadete", teams: 14, maxTeams: 16, image: tournament4, status: "upcoming" },
];

const Torneos = () => {
  const [activeTab, setActiveTab] = useState("Próximos");
  const navigate = useNavigate();

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
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-display font-semibold whitespace-nowrap transition-all ${activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tab}
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
        {tournaments.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/torneo/${t.id}`)}
          >
            <div className="relative h-32">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-accent" />{t.date}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3 text-accent" />{t.teams}/{t.maxTeams}</span>
              </div>
              {/* Progress */}
              <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${(t.teams / t.maxTeams) * 100}%` }} transition={{ duration: 1 }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Torneos;
