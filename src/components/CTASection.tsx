import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-2xl glass p-8 md:p-12">
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
            <span className="text-foreground">¿Organizas torneos? </span>
            <span className="text-gradient-neon">Únete gratis.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Publica tu torneo hoy y llega a miles de equipos. Inscripciones automáticas, pagos integrados y panel en tiempo real.
          </p>
          <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-primary" />
              Sin comisiones ocultas
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-primary" />
              Cobro directo a tu cuenta
            </div>
          </div>
        </div>

        <motion.button
          onClick={() => navigate("/club")}
          className="shrink-0 flex items-center gap-2 px-8 py-4 bg-gradient-neon text-primary-foreground font-display font-bold rounded-xl glow-green"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Publicar mi torneo
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
};

export default CTASection;
