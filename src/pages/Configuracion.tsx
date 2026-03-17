import { motion } from "framer-motion";
import { ArrowLeft, Settings, User, Bell, Shield, Globe, Moon, Smartphone, CreditCard, HelpCircle, FileText, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";

const sections = [
  {
    title: "Cuenta",
    items: [
      { label: "Editar perfil", desc: "Nombre, foto, ubicación", icon: User, path: "#" },
      { label: "Seguridad", desc: "Contraseña, verificación 2FA", icon: Shield, path: "#" },
      { label: "Método de pago", desc: "Visa •••• 4521", icon: CreditCard, path: "#" },
    ],
  },
  {
    title: "Preferencias",
    items: [
      { label: "Idioma", desc: "Español", icon: Globe, path: "#" },
      { label: "Tema", desc: "Oscuro", icon: Moon, path: "#", toggle: true },
      { label: "Notificaciones push", desc: "Activadas", icon: Bell, path: "#", toggle: true },
      { label: "Modo ahorro de datos", desc: "Desactivado", icon: Smartphone, path: "#", toggle: true },
    ],
  },
  {
    title: "Soporte",
    items: [
      { label: "Centro de ayuda", desc: "Preguntas frecuentes", icon: HelpCircle, path: "#" },
      { label: "Términos y condiciones", desc: "Última actualización: Mar 2026", icon: FileText, path: "#" },
      { label: "Política de privacidad", desc: "RGPD compliant", icon: Shield, path: "#" },
    ],
  },
];

const Configuracion = () => {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    Tema: true,
    "Notificaciones push": true,
    "Modo ahorro de datos": false,
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" /> Configuración
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-4 space-y-6">
        {sections.map((section, si) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1 }}>
            <h2 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">{section.title}</h2>
            <div className="glass rounded-xl overflow-hidden divide-y divide-border/30">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-all"
                  onClick={() => {
                    if (item.toggle) {
                      setToggles((prev) => ({ ...prev, [item.label]: !prev[item.label] }));
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-display font-medium text-foreground">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <div className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors ${toggles[item.label] ? "bg-primary" : "bg-muted"}`}>
                      <motion.div className="w-5 h-5 rounded-full bg-foreground" animate={{ x: toggles[item.label] ? 16 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                    </div>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        <p className="text-center text-[10px] text-muted-foreground/50 font-display">TorneoBase v1.0.0 MVP · Hecho con ❤️</p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Configuracion;
