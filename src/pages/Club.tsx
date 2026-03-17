import { motion } from "framer-motion";
import { Plus, Trophy, Users, TrendingUp, Calendar, Eye, Edit, BarChart3, ArrowLeft, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import tournament1 from "@/assets/tournament-1.jpg";
import tournament2 from "@/assets/tournament-2.jpg";

const myTournaments = [
  { id: 1, name: "Costa Daurada Cup 2026", date: "15-19 Jun", teams: 52, maxTeams: 64, revenue: 10140, status: "active", image: tournament1 },
  { id: 2, name: "Summer Beach Cup", date: "1-3 Ago", teams: 8, maxTeams: 24, revenue: 1440, status: "draft", image: tournament2 },
];

const quickStats = [
  { label: "Torneos activos", value: "3", icon: Trophy, color: "text-primary" },
  { label: "Equipos inscritos", value: "124", icon: Users, color: "text-accent" },
  { label: "Ingresos totales", value: "€28,540", icon: TrendingUp, color: "text-primary" },
  { label: "Próximo torneo", value: "12 días", icon: Calendar, color: "text-accent" },
];

const Club = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">Panel de Club</h1>
            <p className="text-xs text-muted-foreground font-display">Gestiona tus torneos</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-6 mt-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickStats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] font-display text-muted-foreground uppercase mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Create tournament CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button onClick={() => setShowForm(!showForm)} className="w-full bg-gradient-neon text-primary-foreground font-display font-bold py-6 rounded-xl text-base glow-green gap-2">
            <Plus className="w-5 h-5" /> Crear nuevo torneo
          </Button>
        </motion.div>

        {/* Create tournament form */}
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-display font-bold text-foreground">Nuevo torneo</h2>
            {[
              { label: "Nombre del torneo", placeholder: "Ej: Summer Cup 2026", type: "text" },
              { label: "Ubicación", placeholder: "Ciudad, País", type: "text" },
              { label: "Categoría", placeholder: "Benjamín / Alevín / Infantil...", type: "text" },
              { label: "Precio por equipo (€)", placeholder: "195", type: "number" },
              { label: "Máximo de equipos", placeholder: "32", type: "number" },
              { label: "Fecha inicio", placeholder: "", type: "date" },
              { label: "Fecha fin", placeholder: "", type: "date" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs font-display text-muted-foreground block mb-1">{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} className="w-full bg-secondary border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground font-display placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            ))}
            <div>
              <label className="text-xs font-display text-muted-foreground block mb-1">Descripción</label>
              <textarea rows={3} placeholder="Describe tu torneo..." className="w-full bg-secondary border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground font-display placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1 font-display">Cancelar</Button>
              <Button className="flex-1 bg-gradient-neon text-primary-foreground font-display font-bold glow-green">Publicar torneo</Button>
            </div>
          </motion.div>
        )}

        {/* My tournaments */}
        <div>
          <h2 className="text-lg font-display font-bold text-foreground mb-3">Mis torneos</h2>
          <div className="space-y-3">
            {myTournaments.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="glass rounded-xl p-4">
                <div className="flex gap-4">
                  <img src={t.image} alt={t.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-foreground text-sm truncate">{t.name}</h3>
                      <span className={`px-2 py-0.5 text-[10px] font-display font-semibold rounded-full ${t.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {t.status === "active" ? "Activo" : "Borrador"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{t.date}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{t.teams}/{t.maxTeams}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-display font-bold text-primary">€{t.revenue.toLocaleString()}</span>
                      <div className="flex gap-1">
                        <button className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors">
                          <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        <button className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors">
                          <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        <button className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors">
                          <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Progress */}
                <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(t.teams / t.maxTeams) * 100}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pending actions */}
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-bold text-foreground text-sm mb-3">Acciones pendientes</h3>
          <div className="space-y-2">
            {[
              { text: "3 solicitudes de inscripción pendientes", icon: Clock, type: "warning" },
              { text: "Verificación de documentos completada", icon: CheckCircle, type: "success" },
              { text: "Actualizar reglamento Summer Beach Cup", icon: AlertTriangle, type: "warning" },
            ].map((action) => (
              <div key={action.text} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-all">
                <action.icon className={`w-4 h-4 flex-shrink-0 ${action.type === "success" ? "text-primary" : "text-pulse"}`} />
                <span className="text-xs text-muted-foreground">{action.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
