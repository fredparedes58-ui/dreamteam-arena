import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Index from "./pages/Index";
import Explorar from "./pages/Explorar";
import Torneos from "./pages/Torneos";
import Perfil from "./pages/Perfil";
import TorneoDetail from "./pages/TorneoDetail";
import Club from "./pages/Club";
import Admin from "./pages/Admin";
import Notificaciones from "./pages/Notificaciones";
import MiEquipo from "./pages/MiEquipo";
import Inscripciones from "./pages/Inscripciones";
import Configuracion from "./pages/Configuracion";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/explorar" element={<Explorar />} />
              <Route path="/torneos" element={<Torneos />} />
              <Route path="/torneo/:id" element={<TorneoDetail />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Authenticated */}
              <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
              <Route path="/notificaciones" element={<ProtectedRoute><Notificaciones /></ProtectedRoute>} />
              <Route path="/mi-equipo" element={<ProtectedRoute><MiEquipo /></ProtectedRoute>} />
              <Route path="/inscripciones" element={<ProtectedRoute><Inscripciones /></ProtectedRoute>} />
              <Route path="/configuracion" element={<ProtectedRoute><Configuracion /></ProtectedRoute>} />

              {/* Club role */}
              <Route path="/club" element={<ProtectedRoute requiredRole="club"><Club /></ProtectedRoute>} />

              {/* Admin role */}
              <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><Admin /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
