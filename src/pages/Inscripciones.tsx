import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Calendar, MapPin, CheckCircle, Clock, XCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

import tournament1 from "@/assets/tournament-1.jpg";
import tournament2 from "@/assets/tournament-2.jpg";
import tournament3 from "@/assets/tournament-3.jpg";
import tournament4 from "@/assets/tournament-4.jpg";

const inscriptions = [
  { id: 1, tournamentId: 1, name: "Costa Daurada Cup 2026", location: "Salou, Tarragona", date: "15-19 Jun 2026", status: "confirmed", paidAmount: 195, team: "Benjamín A", image: tournament1, registeredOn: "12 Mar 2026" },
  { id: 2, tournamentId: 2, name: "Pirineos Youth Championship", location: "Jaca, Huesca", date: "22-25 Jul 2026", status: "pending", paidAmount: 0, team: "Benjamín A", image: tournament2, registeredOn: "15 Mar 2026" },
  { id: 3, tournamentId: 3, name: "Mediterranean Cup", location: "Palma, Mallorca", date: "5-8 Ago 2026", status: "confirmed", paidAmount: 250, team: "Alevín B", image: tournament3, registeredOn: "8 Feb 2026" },
  { id: 4, tournamentId: 4, name: "Madrid Night League", location: "Madrid", date: "10-12 Jul 2026", status: "cancelled", paidAmount: 180, team: "Benjamín A", image: tournament4, registeredOn: "20 Ene 2026" },
];

const statusConfig: Record<string, { label: string; icon: typeof CheckCircle; color: string; bg: string }> = {
  confirmed: { label: "Confirmada", icon: CheckCircle, color: "text-primary", bg: "bg-primary/10" },
  pending: { label: "Pendiente", icon: Clock, color: "text-pulse", bg: "bg-pulse/10" },
  cancelled: { label: "Cancelada", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
};

const Inscripciones = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" /> Mis Inscripciones
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-4 space-y-3">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Confirmadas", value: inscriptions.filter((i) => i.status === "confirmed").length, color: "text-primary" },
            { label: "Pendientes", value: inscriptions.filter((i) => i.status === "pending").length, color: "text-pulse" },
            { label: "Total pagado", value: `€${inscriptions.filter((i) => i.status === "confirmed").reduce((a, b) => a + b.paidAmount, 0)}`, color: "text-accent" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-3 text-center">
              <p className={`text-xl font-display font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] font-display text-muted-foreground uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* List */}
        {inscriptions.map((insc, i) => {
          const st = statusConfig[insc.status];
          return (
            <motion.div
              key={insc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => navigate(`/torneo/${insc.tournamentId}`)}
            >
              <div className="flex gap-4 p-4">
                <img src={insc.image} alt={insc.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-display font-bold text-foreground truncate">{insc.name}</h3>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-accent" />{insc.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-accent" />{insc.date}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-display font-semibold rounded-full ${st.bg} ${st.color}`}>
                      <st.icon className="w-3 h-3" /> {st.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">Equipo: {insc.team}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">Registrado: {insc.registeredOn}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default Inscripciones;
