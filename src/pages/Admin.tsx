import { motion } from "framer-motion";
import { ArrowLeft, Shield, Users, Trophy, BarChart3, AlertTriangle, CheckCircle, XCircle, Eye, Ban, TrendingUp, Activity, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const overviewStats = [
  { label: "Usuarios totales", value: "12,847", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Torneos activos", value: "342", change: "+8%", icon: Trophy, color: "text-accent" },
  { label: "Ingresos mes", value: "€186,420", change: "+23%", icon: TrendingUp, color: "text-primary" },
  { label: "Incidencias", value: "7", change: "-15%", icon: AlertTriangle, color: "text-pulse" },
];

const recentUsers = [
  { id: 1, name: "FC Barcelona Academy", type: "Club", status: "verified", date: "Hace 2h" },
  { id: 2, name: "CD Leganés Base", type: "Club", status: "pending", date: "Hace 5h" },
  { id: 3, name: "María López", type: "Entrenador", status: "verified", date: "Hace 1d" },
  { id: 4, name: "Real Sociedad Youth", type: "Club", status: "pending", date: "Hace 1d" },
  { id: 5, name: "Juan Pérez", type: "Padre/Madre", status: "verified", date: "Hace 2d" },
];

const pendingTournaments = [
  { id: 5, name: "Valencia Summer Cup", organizer: "Valencia CF Base", category: "Alevín", date: "Ago 2026" },
  { id: 6, name: "Basque Country League", organizer: "Athletic Bilbao Youth", category: "Infantil", date: "Sep 2026" },
  { id: 7, name: "Canarias Open", organizer: "UD Las Palmas Base", category: "Benjamín", date: "Jul 2026" },
];

const tabs = ["Overview", "Usuarios", "Torneos", "Incidencias"];

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const { toast } = useToast();
  const [users, setUsers] = useState(recentUsers);
  const [tournaments, setTournaments] = useState(pendingTournaments);

  const handleVerifyUser = (id: number, action: "verify" | "reject") => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: action === "verify" ? "verified" : "rejected" } : u));
    toast({ title: action === "verify" ? "✅ Usuario verificado" : "❌ Usuario rechazado", description: `Acción completada` });
  };

  const handleTournament = (id: number, action: "approve" | "reject") => {
    setTournaments((prev) => prev.filter((t) => t.id !== id));
    toast({ title: action === "approve" ? "✅ Torneo aprobado" : "🚫 Torneo rechazado", description: `El torneo ha sido ${action === "approve" ? "aprobado y publicado" : "rechazado"}` });
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-display font-bold text-foreground">Admin Panel</h1>
          </div>
          <span className="ml-auto px-2 py-1 text-[10px] font-display font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
            SUPER ADMIN
          </span>
        </div>
        <div className="flex gap-1 overflow-x-auto scrollbar-none pb-2">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-xs font-display font-semibold whitespace-nowrap transition-all ${activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-6 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {overviewStats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <span className={`text-[10px] font-display font-semibold ${s.change.startsWith("+") ? "text-primary" : "text-pulse"}`}>{s.change}</span>
              </div>
              <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] font-display text-muted-foreground uppercase mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-display font-bold text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Actividad (7 días)
            </h2>
            <Globe className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-end gap-1 h-24">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <motion.div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative overflow-hidden" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/40 rounded-t-sm" style={{ height: "100%" }} />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[9px] font-display text-muted-foreground">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <h2 className="text-sm font-display font-bold text-foreground mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" /> Usuarios recientes
          </h2>
          <div className="space-y-2">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-semibold text-foreground">{u.name}</p>
                    <p className="text-[10px] text-muted-foreground">{u.type} · {u.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[10px] font-display font-semibold rounded-full ${u.status === "verified" ? "bg-primary/10 text-primary" : u.status === "rejected" ? "bg-destructive/10 text-destructive" : "bg-pulse/10 text-pulse"}`}>
                    {u.status === "verified" ? "Verificado" : u.status === "rejected" ? "Rechazado" : "Pendiente"}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => toast({ title: "👁️ Viendo perfil", description: u.name })} className="w-6 h-6 rounded bg-secondary flex items-center justify-center hover:bg-primary/10"><Eye className="w-3 h-3 text-muted-foreground" /></button>
                    {u.status === "pending" && (
                      <>
                        <button onClick={() => handleVerifyUser(u.id, "verify")} className="w-6 h-6 rounded bg-secondary flex items-center justify-center hover:bg-primary/10"><CheckCircle className="w-3 h-3 text-primary" /></button>
                        <button onClick={() => handleVerifyUser(u.id, "reject")} className="w-6 h-6 rounded bg-secondary flex items-center justify-center hover:bg-destructive/10"><XCircle className="w-3 h-3 text-destructive" /></button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <h2 className="text-sm font-display font-bold text-foreground mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" /> Torneos pendientes de aprobación
          </h2>
          {tournaments.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4 font-display">🎉 No hay torneos pendientes</p>
          ) : (
            <div className="space-y-2">
              {tournaments.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg glass border border-border/30">
                  <div>
                    <p className="text-xs font-display font-bold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.organizer} · {t.category} · {t.date}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleTournament(t.id, "approve")} className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20"><CheckCircle className="w-3.5 h-3.5 text-primary" /></button>
                    <button onClick={() => handleTournament(t.id, "reject")} className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center hover:bg-destructive/20"><Ban className="w-3.5 h-3.5 text-destructive" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
