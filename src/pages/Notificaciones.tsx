import { motion } from "framer-motion";
import { ArrowLeft, Bell, Trophy, CheckCircle, AlertTriangle, MessageSquare, Zap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const notifications = [
  { id: 1, type: "inscripcion", title: "Inscripción confirmada", desc: "Tu equipo ha sido inscrito en Costa Daurada Cup 2026", time: "Hace 5 min", read: false, icon: CheckCircle, color: "text-primary" },
  { id: 2, type: "alerta", title: "¡Plazas agotándose!", desc: "Pirineos Youth Championship tiene solo 10 plazas restantes", time: "Hace 1h", read: false, icon: AlertTriangle, color: "text-pulse" },
  { id: 3, type: "torneo", title: "Nuevo torneo disponible", desc: "Mediterranean Cup en Palma de Mallorca ya acepta inscripciones", time: "Hace 3h", read: false, icon: Trophy, color: "text-accent" },
  { id: 4, type: "mensaje", title: "Mensaje del organizador", desc: "CD Salou Academy te ha enviado información sobre el alojamiento", time: "Hace 6h", read: true, icon: MessageSquare, color: "text-primary" },
  { id: 5, type: "resultado", title: "Resultado publicado", desc: "Tu equipo ganó 3-1 vs AD Alcorcón en la fase de grupos", time: "Hace 1d", read: true, icon: Zap, color: "text-accent" },
  { id: 6, type: "equipo", title: "Jugador añadido", desc: "Pablo García ha sido añadido a tu plantilla para la temporada 2026", time: "Hace 1d", read: true, icon: Users, color: "text-primary" },
  { id: 7, type: "inscripcion", title: "Pago recibido", desc: "Se ha confirmado el pago de €195 para Costa Daurada Cup", time: "Hace 2d", read: true, icon: CheckCircle, color: "text-primary" },
  { id: 8, type: "alerta", title: "Cambio de horario", desc: "El partido del sábado se ha adelantado a las 10:00", time: "Hace 3d", read: true, icon: AlertTriangle, color: "text-pulse" },
];

const Notificaciones = () => {
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" /> Notificaciones
            </h1>
          </div>
          {unread > 0 && (
            <span className="px-2.5 py-1 text-xs font-display font-bold rounded-full bg-pulse/20 text-pulse border border-pulse/30">
              {unread} nuevas
            </span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-4 space-y-2">
        {notifications.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all hover:bg-secondary/50 ${!n.read ? "glass border border-primary/20" : ""}`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${!n.read ? "bg-primary/10" : "bg-secondary"}`}>
              <n.icon className={`w-4 h-4 ${n.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`text-sm font-display font-semibold ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>{n.title}</h3>
                {!n.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Notificaciones;
