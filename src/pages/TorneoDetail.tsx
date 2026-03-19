import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Users, Star, Share2, Heart, DollarSign, Shield, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTournament } from "@/hooks/use-tournaments";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import RegisterTeamDialog from "@/components/RegisterTeamDialog";

const TorneoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: t, isLoading, error } = useTournament(id || "");
  const [registerOpen, setRegisterOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !t) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg font-display font-bold text-foreground">Torneo no encontrado</p>
        <Button variant="outline" onClick={() => navigate("/torneos")}>Volver a torneos</Button>
      </div>
    );
  }

  const currentTeams = t.current_teams ?? 0;
  const maxTeams = t.max_teams ?? 16;
  const fillPercent = Math.round((currentTeams / maxTeams) * 100);

  const dateStr = t.start_date && t.end_date
    ? `${format(new Date(t.start_date), "d MMM", { locale: es })} - ${format(new Date(t.end_date), "d MMM yyyy", { locale: es })}`
    : t.start_date
      ? format(new Date(t.start_date), "d MMM yyyy", { locale: es })
      : "Por confirmar";

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="relative h-72">
        <img src={t.image_url || "/placeholder.svg"} alt={t.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full glass flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center"><Share2 className="w-5 h-5 text-foreground" /></button>
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center"><Heart className="w-5 h-5 text-foreground" /></button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-10 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-display font-semibold rounded-full bg-accent/20 text-accent border border-accent/30">{t.category}</span>
            {t.status === "live" && (
              <span className="px-3 py-1 text-xs font-display font-semibold rounded-full bg-pulse/20 text-pulse border border-pulse/30 animate-pulse">EN VIVO</span>
            )}
            <div className="flex items-center gap-1"><Star className="w-4 h-4 text-primary fill-primary" /><span className="text-sm font-semibold text-foreground">{t.rating ?? 0}</span></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">{t.name}</h1>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: MapPin, label: "Ubicación", value: t.location || "TBD" },
            { icon: Calendar, label: "Fechas", value: dateStr },
            { icon: Users, label: "Equipos", value: `${currentTeams}/${maxTeams}` },
            { icon: DollarSign, label: "Precio", value: (t.price ?? 0) === 0 ? "Gratis" : `€${t.price}` },
          ].map((info) => (
            <div key={info.label} className="glass rounded-xl p-3 text-center">
              <info.icon className="w-4 h-4 text-accent mx-auto mb-1" />
              <p className="text-xs text-muted-foreground font-display">{info.label}</p>
              <p className="text-sm font-display font-bold text-foreground">{info.value}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-display text-muted-foreground">Ocupación</span>
            <span className="font-display font-bold text-foreground">{fillPercent}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div className={`h-full rounded-full ${fillPercent > 80 ? "bg-pulse" : "bg-primary"}`} initial={{ width: 0 }} animate={{ width: `${fillPercent}%` }} transition={{ duration: 1 }} />
          </div>
        </div>

        {t.description && (
          <div>
            <h2 className="text-lg font-display font-bold text-foreground mb-2">Descripción</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
          </div>
        )}

        {t.format && (
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-muted-foreground font-display">Formato</p>
            <p className="text-sm font-display font-bold text-foreground">{t.format}</p>
          </div>
        )}

        {t.rules && t.rules.length > 0 && (
          <div>
            <h2 className="text-lg font-display font-bold text-foreground mb-2">Reglas</h2>
            <div className="grid grid-cols-2 gap-2">
              {t.rules.map((rule: string) => (
                <div key={rule} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" /><span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {t.included && t.included.length > 0 && (
          <div>
            <h2 className="text-lg font-display font-bold text-foreground mb-2">Incluido</h2>
            <div className="grid grid-cols-2 gap-2">
              {t.included.map((item: string) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-accent flex-shrink-0" /><span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <motion.div className="sticky bottom-4 z-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="glass rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-2xl font-display font-bold text-primary">
                {(t.price ?? 0) === 0 ? "Gratis" : `€${t.price}`}
              </p>
              <p className="text-xs text-muted-foreground">por equipo</p>
            </div>
            <Button onClick={() => setRegisterOpen(true)} className="bg-gradient-neon text-primary-foreground font-display font-bold px-8 py-6 rounded-xl text-base glow-green">
              Inscribir equipo
            </Button>
          </div>
        </motion.div>
      </div>

      <RegisterTeamDialog tournament={t} open={registerOpen} onOpenChange={setRegisterOpen} />
    </div>
  );
};

export default TorneoDetail;
