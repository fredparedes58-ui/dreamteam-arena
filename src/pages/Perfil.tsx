import { motion } from "framer-motion";
import { User, Settings, Trophy, Star, MapPin, ChevronRight, Shield, Bell, LogOut, Award, Zap, Loader2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";

const menuItems = [
  { label: "Mi equipo", icon: Shield, path: "/mi-equipo" },
  { label: "Mis inscripciones", icon: Trophy, path: "/inscripciones" },
  { label: "Notificaciones", icon: Bell, path: "/notificaciones" },
  { label: "Configuración", icon: Settings, path: "/configuracion" },
];

const roleMenuItems = [
  { label: "Panel de Club", icon: Star, path: "/club", role: "club" as const },
  { label: "Panel Admin", icon: Shield, path: "/admin", role: "admin" as const },
];

const Perfil = () => {
  const navigate = useNavigate();
  const { profile, roles, isLoading, user } = useAuth();

  const handleLogout = async () => {
    await authService.signOut();
    navigate("/auth");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg font-display font-bold text-foreground">Inicia sesión para ver tu perfil</p>
        <button onClick={() => navigate("/auth")} className="text-primary font-display font-semibold hover:underline">Ir a login →</button>
        <BottomNav />
      </div>
    );
  }

  const stats = [
    { label: "Nivel", value: String(profile.level), icon: Trophy },
    { label: "XP", value: profile.xp.toLocaleString(), icon: Zap },
    { label: "Estado", value: profile.verification_status === "verified" ? "✓" : "–", icon: Award },
  ];

  const visibleRoleMenus = roleMenuItems.filter((item) => roles.includes(item.role) || roles.includes("admin"));

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
        <div className="relative px-4 pt-14 pb-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 ring-4 ring-primary/20">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-primary-foreground" />
              )}
            </div>
            <h1 className="text-xl font-display font-bold text-foreground">{profile.display_name}</h1>
            {profile.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-3 h-3 text-accent" />
                <span>{profile.location}</span>
              </div>
            )}
            <span className={`mt-2 px-3 py-1 text-xs font-display font-semibold rounded-full border ${profile.verification_status === "verified" ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground border-border"}`}>
              {profile.verification_status === "verified" ? "Verificado" : "Sin verificar"}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-4 text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] font-display text-muted-foreground uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-display font-semibold text-foreground">Nivel {profile.level}</span>
            <span className="text-xs text-muted-foreground">{profile.xp} XP</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-neon rounded-full" initial={{ width: 0 }} animate={{ width: `${Math.min((profile.xp % 1000) / 10, 100)}%` }} transition={{ duration: 1.2 }} />
          </div>
        </div>

        <div className="space-y-1">
          {menuItems.map((item, i) => (
            <motion.button key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }} onClick={() => navigate(item.path)} className="w-full flex items-center justify-between p-4 rounded-xl transition-all hover:bg-secondary/50">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-display font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
          {visibleRoleMenus.map((item, i) => (
            <motion.button key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }} onClick={() => navigate(item.path)} className="w-full flex items-center justify-between p-4 rounded-xl transition-all glass border border-primary/20 hover:border-primary/40">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-display font-medium text-primary">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 rounded-xl text-destructive hover:bg-destructive/10 transition-all">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-display font-medium">Cerrar sesión</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Perfil;
