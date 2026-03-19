import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useMyTeams } from "@/hooks/use-teams";
import { useRegisterTeam } from "@/hooks/use-registrations";
import { Loader2, Shield, AlertCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Tournament } from "@/types/domain";

interface Props {
  tournament: Tournament;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegisterTeamDialog = ({ tournament, open, onOpenChange }: Props) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: teams, isLoading: teamsLoading } = useMyTeams(user?.id || "");
  const registerMutation = useRegisterTeam();
  const [selectedTeamId, setSelectedTeamId] = useState("");

  const handleRegister = () => {
    if (!user || !selectedTeamId) return;
    registerMutation.mutate(
      { tournamentId: tournament.id, teamId: selectedTeamId, userId: user.id },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Inicia sesión</DialogTitle>
            <DialogDescription>Necesitas una cuenta para inscribir tu equipo.</DialogDescription>
          </DialogHeader>
          <Button onClick={() => navigate("/auth")} className="w-full bg-gradient-neon text-primary-foreground font-display font-bold glow-green">
            Ir a iniciar sesión
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  const currentTeams = tournament.current_teams ?? 0;
  const maxTeams = tournament.max_teams ?? 16;
  const isFull = currentTeams >= maxTeams;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> Inscribir equipo
          </DialogTitle>
          <DialogDescription className="font-display">
            {tournament.name} — {tournament.category}
          </DialogDescription>
        </DialogHeader>

        {isFull ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <AlertCircle className="w-10 h-10 text-pulse" />
            <p className="text-sm text-muted-foreground text-center font-display">Este torneo está completo ({currentTeams}/{maxTeams} equipos).</p>
          </div>
        ) : teamsLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : !teams || teams.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <Users className="w-10 h-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center font-display">No tienes equipos creados. Crea uno primero.</p>
            <Button variant="outline" onClick={() => navigate("/mi-equipo")} className="font-display">
              Ir a Mi Equipo
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-display text-muted-foreground block mb-2">Selecciona tu equipo</label>
              <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige un equipo..." />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name} {team.category ? `· ${team.category}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="glass rounded-xl p-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-display">Precio</span>
                <span className="font-display font-bold text-foreground">
                  {(tournament.price ?? 0) === 0 ? "Gratis" : `€${tournament.price}`}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-display">Plazas disponibles</span>
                <span className="font-display font-bold text-foreground">{maxTeams - currentTeams}</span>
              </div>
            </div>

            <Button
              onClick={handleRegister}
              disabled={!selectedTeamId || registerMutation.isPending}
              className="w-full bg-gradient-neon text-primary-foreground font-display font-bold py-5 rounded-xl glow-green"
            >
              {registerMutation.isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Inscribiendo...</>
              ) : (
                "Confirmar inscripción"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegisterTeamDialog;
