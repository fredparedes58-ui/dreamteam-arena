import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Explorar from "./pages/Explorar.tsx";
import Torneos from "./pages/Torneos.tsx";
import Perfil from "./pages/Perfil.tsx";
import TorneoDetail from "./pages/TorneoDetail.tsx";
import Club from "./pages/Club.tsx";
import Admin from "./pages/Admin.tsx";
import Notificaciones from "./pages/Notificaciones.tsx";
import MiEquipo from "./pages/MiEquipo.tsx";
import Inscripciones from "./pages/Inscripciones.tsx";
import Configuracion from "./pages/Configuracion.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/torneos" element={<Torneos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/torneo/:id" element={<TorneoDetail />} />
          <Route path="/club" element={<Club />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/mi-equipo" element={<MiEquipo />} />
          <Route path="/inscripciones" element={<Inscripciones />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
