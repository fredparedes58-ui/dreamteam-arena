import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, Eye, EyeOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, signupSchema, type LoginInput, type SignupInput } from "@/lib/schemas";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", displayName: "" },
  });

  const handleLogin = async (data: LoginInput) => {
    setLoading(true);
    try {
      await authService.signIn(data);
      toast.success("¡Bienvenido de vuelta!");
      navigate(from, { replace: true });
    } catch (e: any) {
      toast.error(`Error de autenticación: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (data: SignupInput) => {
    setLoading(true);
    try {
      await authService.signUp(data);
      toast.success("Cuenta creada. Revisa tu email para confirmar.");
      setMode("login");
    } catch (e: any) {
      toast.error(`Error al registrarse: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    const email = loginForm.getValues("email");
    if (!email) {
      toast.error("Introduce tu email primero");
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(email);
      toast.success("Email de recuperación enviado");
      setMode("login");
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="glass rounded-2xl p-8 w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-neon flex items-center justify-center mx-auto glow-green">
            <Zap className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">TorneoBase</h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login" ? "Inicia sesión en tu cuenta" : mode === "signup" ? "Crea tu cuenta" : "Recupera tu contraseña"}
          </p>
        </div>

        {/* Login Form */}
        {mode === "login" && (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...loginForm.register("email")}
                  placeholder="Email"
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
              {loginForm.formState.errors.email && (
                <p className="text-xs text-destructive">{loginForm.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...loginForm.register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="pl-10 pr-10 bg-muted/50 border-border"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <p className="text-xs text-destructive">{loginForm.formState.errors.password.message}</p>
              )}
            </div>
            <button type="button" onClick={() => setMode("reset")} className="text-xs text-accent hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-neon text-primary-foreground font-display font-bold glow-green">
              {loading ? "Cargando..." : "Iniciar sesión"}
            </Button>
          </form>
        )}

        {/* Signup Form */}
        {mode === "signup" && (
          <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
            <div className="space-y-1">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...signupForm.register("displayName")}
                  placeholder="Nombre"
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
              {signupForm.formState.errors.displayName && (
                <p className="text-xs text-destructive">{signupForm.formState.errors.displayName.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...signupForm.register("email")}
                  placeholder="Email"
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
              {signupForm.formState.errors.email && (
                <p className="text-xs text-destructive">{signupForm.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...signupForm.register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña (min. 6 caracteres)"
                  className="pl-10 pr-10 bg-muted/50 border-border"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
              {signupForm.formState.errors.password && (
                <p className="text-xs text-destructive">{signupForm.formState.errors.password.message}</p>
              )}
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-neon text-primary-foreground font-display font-bold glow-green">
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>
        )}

        {/* Reset */}
        {mode === "reset" && (
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                {...loginForm.register("email")}
                placeholder="Tu email"
                className="pl-10 bg-muted/50 border-border"
              />
            </div>
            <Button onClick={handleReset} disabled={loading} className="w-full bg-gradient-neon text-primary-foreground font-display font-bold glow-green">
              {loading ? "Enviando..." : "Enviar enlace de recuperación"}
            </Button>
            <button onClick={() => setMode("login")} className="text-xs text-accent hover:underline block mx-auto">
              Volver al login
            </button>
          </div>
        )}

        {/* Toggle */}
        {mode !== "reset" && (
          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-accent hover:underline font-semibold">
              {mode === "login" ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Auth;
