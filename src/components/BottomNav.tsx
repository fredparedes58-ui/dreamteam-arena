import { motion } from "framer-motion";
import { Home, Search, Zap, Trophy, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { id: "home", icon: Home, label: "Inicio", path: "/" },
  { id: "search", icon: Search, label: "Explorar", path: "/explorar" },
  { id: "predict", icon: Zap, label: "", path: "/" },
  { id: "tournaments", icon: Trophy, label: "Torneos", path: "/torneos" },
  { id: "profile", icon: User, label: "Perfil", path: "/perfil" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getActive = () => navItems.find((i) => i.path === location.pathname)?.id || "home";
  const active = getActive();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass border-t border-border/50 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isCenter = item.id === "predict";
            const isActive = active === item.id;
            const Icon = item.icon;

            if (isCenter) {
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className="relative -mt-6 w-14 h-14 rounded-2xl bg-gradient-neon flex items-center justify-center glow-green"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-6 h-6 text-primary-foreground" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-pulse rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-display font-bold text-foreground">3</span>
                  </div>
                </motion.button>
              );
            }

            return (
              <motion.button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="flex flex-col items-center gap-0.5 py-2 px-3"
                whileTap={{ scale: 0.9 }}
              >
                <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-[10px] font-display transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
