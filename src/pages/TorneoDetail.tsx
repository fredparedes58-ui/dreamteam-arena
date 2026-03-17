import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Users, Star, Share2, Heart, Clock, DollarSign, Shield, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

import tournament1 from "@/assets/tournament-1.jpg";
import tournament2 from "@/assets/tournament-2.jpg";
import tournament3 from "@/assets/tournament-3.jpg";
import tournament4 from "@/assets/tournament-4.jpg";

const tournamentsData: Record<string, any> = {
  "1": { name: "Costa Daurada Cup 2026", location: "Salou, Tarragona", date: "15-19 Junio 2026", category: "Benjamín", price: 195, teams: 52, maxTeams: 64, rating: 4.8, image: tournament1, description: "El torneo más prestigioso de la Costa Daurada. 5 días de fútbol base de élite con equipos de toda Europa. Instalaciones de primer nivel y experiencia única para jugadores y familias.", organizer: "CD Salou Academy", rules: ["11 vs 11", "2 tiempos de 25 min", "Fase de grupos + eliminatorias", "Arbitraje federado"], included: ["Alojamiento 4 noches", "Pensión completa", "Seguro deportivo", "Kit de bienvenida", "Trofeos y medallas"] },
  "2": { name: "Pirineos Youth Championship", location: "Jaca, Huesca", date: "22-25 Julio 2026", category: "Alevín", price: 220, teams: 38, maxTeams: 48, rating: 4.9, image: tournament2, description: "Competición en un entorno natural espectacular. Combina fútbol de alto nivel con actividades de montaña.", organizer: "Pirineos Sports", rules: ["8 vs 8", "2 tiempos de 20 min", "Liga + semifinales + final"], included: ["3 noches hotel", "Media pensión", "Excursión montaña", "Seguro deportivo"] },
  "3": { name: "Mediterranean Cup", location: "Palma, Mallorca", date: "5-8 Agosto 2026", category: "Infantil", price: 250, teams: 20, maxTeams: 32, rating: 4.6, image: tournament3, description: "Fútbol junto al Mediterráneo. Torneo internacional con equipos de más de 10 países.", organizer: "Mallorca FC Base", rules: ["11 vs 11", "2 tiempos de 30 min", "Eliminatoria directa"], included: ["Hotel 3 noches", "Desayuno y cena", "Día de playa", "Camiseta oficial"] },
  "4": { name: "Madrid Night League", location: "Madrid", date: "10-12 Julio 2026", category: "Cadete", price: 180, teams: 14, maxTeams: 16, rating: 4.7, image: tournament4, description: "Liga nocturna bajo los focos de Madrid. Experiencia única de fútbol urbano con formato innovador.", organizer: "Madrid Urban Sports", rules: ["7 vs 7", "Partidos nocturnos", "Round robin + final"], included: ["2 noches hotel", "Cena post-partido", "Seguro deportivo"] },
};

const TorneoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = tournamentsData[id || "1"] || tournamentsData["1"];
  const fillPercent = Math.round((t.teams / t.maxTeams) * 100);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Hero image */}
      <div className="relative h-72">
        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full glass flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <Heart className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-10 space-y-6">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-display font-semibold rounded-full bg-accent/20 text-accent border border-accent/30">{t.category}</span>
            <div className="flex items-center gap-1"><Star className="w-4 h-4 text-primary fill-primary" /><span className="text-sm font-semibold text-foreground">{t.rating}</span></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">{t.name}</h1>
        </motion.div>

        {/* Info grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: MapPin, label: "Ubicación", value: t.location },
            { icon: Calendar, label: "Fechas", value: t.date },
            { icon: Users, label: "Equipos", value: `${t.teams}/${t.maxTeams}` },
            { icon: DollarSign, label: "Precio", value: `€${t.price}` },
          ].map((info) => (
            <div key={info.label} className="glass rounded-xl p-3 text-center">
              <info.icon className="w-4 h-4 text-accent mx-auto mb-1" />
              <p className="text-xs text-muted-foreground font-display">{info.label}</p>
              <p className="text-sm font-display font-bold text-foreground">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Capacity */}
        <div className="glass rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-display text-muted-foreground">Ocupación</span>
            <span className="font-display font-bold text-foreground">{fillPercent}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div className={`h-full rounded-full ${fillPercent > 80 ? "bg-pulse" : "bg-primary"}`} initial={{ width: 0 }} animate={{ width: `${fillPercent}%` }} transition={{ duration: 1 }} />
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-display font-bold text-foreground mb-2">Descripción</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
        </div>

        {/* Organizer */}
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-display font-bold text-foreground">{t.organizer}</p>
            <p className="text-xs text-muted-foreground">Organizador verificado</p>
          </div>
          <CheckCircle className="w-4 h-4 text-primary ml-auto" />
        </div>

        {/* Rules */}
        <div>
          <h2 className="text-lg font-display font-bold text-foreground mb-2">Formato</h2>
          <div className="grid grid-cols-2 gap-2">
            {t.rules.map((rule: string) => (
              <div key={rule} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Included */}
        <div>
          <h2 className="text-lg font-display font-bold text-foreground mb-2">Incluido</h2>
          <div className="grid grid-cols-2 gap-2">
            {t.included.map((item: string) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-accent flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div className="sticky bottom-4 z-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="glass rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-2xl font-display font-bold text-primary">€{t.price}</p>
              <p className="text-xs text-muted-foreground">por equipo</p>
            </div>
            <Button className="bg-gradient-neon text-primary-foreground font-display font-bold px-8 py-6 rounded-xl text-base glow-green">
              Inscribir equipo
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TorneoDetail;
