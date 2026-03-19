import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      await authService.updatePassword(password);
      toast.success("Contraseña actualizada con éxito");
      navigate("/");
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-8 max-w-md text-center space-y-4">
          <h2 className="text-xl font-display font-bold text-foreground">Enlace inválido</h2>
          <p className="text-sm text-muted-foreground">Este enlace de recuperación no es válido o ha expirado.</p>
          <Button onClick={() => navigate("/auth")} className="bg-gradient-neon text-primary-foreground font-display">
            Ir al login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div className="glass rounded-2xl p-8 w-full max-w-md space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-neon flex items-center justify-center mx-auto glow-green">
            <Lock className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-display font-bold text-foreground">Nueva contraseña</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="password" placeholder="Nueva contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-muted/50 border-border" />
          <Input type="password" placeholder="Confirmar contraseña" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="bg-muted/50 border-border" />
          <Button type="submit" disabled={loading} className="w-full bg-gradient-neon text-primary-foreground font-display font-bold glow-green">
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
