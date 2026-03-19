import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Users, Star, Calendar, Edit, Trash2, Plus, Award, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useMyTeams, useCreateTeam, useAddPlayer } from "@/hooks/use-teams";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamSchema, playerSchema, type TeamInput, type PlayerInput } from "@/lib/schemas";
import { teamsService } from "@/services/teams.service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { PlayerPosition } from "@/types/domain";

const positionColor = (pos: string) => {
  if (pos === "portero") return "bg-accent/10 text-accent";
  if (pos === "defensa") return "bg-primary/10 text-primary";
  if (pos === "centrocampista") return "bg-pulse/10 text-pulse";
  return "bg-accent/10 text-accent";
};

const positionLabel: Record<string, string> = {
  portero: "Portero",
  defensa: "Defensa",
  centrocampista: "Centrocampista",
  delantero: "Delantero",
};

const MiEquipo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: teams, isLoading } = useMyTeams(user?.id || "");
  const createTeamMutation = useCreateTeam();
  const addPlayerMutation = useAddPlayer();

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);

  const teamForm = useForm<TeamInput>({ resolver: zodResolver(teamSchema), defaultValues: { name: "", category: "", city: "" } });
  const playerForm = useForm<PlayerInput>({ resolver: zodResolver(playerSchema), defaultValues: { name: "", position: "centrocampista" } });

  const onCreateTeam = (values: TeamInput) => {
    if (!user) return;
    createTeamMutation.mutate({ input: values, ownerId: user.id }, { onSuccess: () => { setShowTeamForm(false); teamForm.reset(); } });
  };

  const onAddPlayer = (values: PlayerInput) => {
    if (!activeTeamId) return;
    addPlayerMutation.mutate({ input: values, teamId: activeTeamId }, { onSuccess: () => { setShowPlayerForm(false); playerForm.reset(); } });
  };

  const handleRemovePlayer = async (playerId: string) => {
    try {
      await teamsService.removePlayer(playerId);
      qc.invalidateQueries({ queryKey: ["my-teams"] });
      toast.success("Jugador eliminado");
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    }
  };

  // Pick the first team or show team creation
  const activeTeam = teams?.find((t) => t.id === activeTeamId) || teams?.[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Mi Equipo
            </h1>
            {activeTeam && <p className="text-xs text-muted-foreground font-display">{activeTeam.name} {activeTeam.category ? `· ${activeTeam.category}` : ""}</p>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-6 mt-4">
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
        ) : !teams || teams.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground font-display">No tienes equipos creados aún.</p>
            <Button onClick={() => setShowTeamForm(true)} className="bg-gradient-neon text-primary-foreground font-display font-bold glow-green gap-2">
              <Plus className="w-4 h-4" /> Crear equipo
            </Button>
          </div>
        ) : (
          <>
            {/* Team selector */}
            {teams.length > 1 && (
              <Select value={activeTeam?.id} onValueChange={(v) => setActiveTeamId(v)}>
                <SelectTrigger><SelectValue placeholder="Seleccionar equipo" /></SelectTrigger>
                <SelectContent>
                  {teams.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            )}

            {/* Stats */}
            {activeTeam && (
              <>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Jugadores", value: String(activeTeam.players?.length ?? 0), icon: Users },
                    { label: "Goles", value: String(activeTeam.players?.reduce((a: number, p: any) => a + (p.goals ?? 0), 0) ?? 0), icon: Award },
                    { label: "Media edad", value: activeTeam.players?.length ? (activeTeam.players.reduce((a: number, p: any) => a + (p.age ?? 0), 0) / activeTeam.players.length).toFixed(1) : "0", icon: Calendar },
                    { label: "Rating", value: activeTeam.players?.length ? (activeTeam.players.reduce((a: number, p: any) => a + (p.rating ?? 0), 0) / activeTeam.players.length).toFixed(1) : "0", icon: Star },
                  ].map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-3 text-center">
                      <s.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                      <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
                      <p className="text-[9px] font-display text-muted-foreground uppercase">{s.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Add player */}
                <Button onClick={() => { setActiveTeamId(activeTeam.id); setShowPlayerForm(true); }} className="w-full bg-gradient-neon text-primary-foreground font-display font-bold py-5 rounded-xl gap-2 glow-green">
                  <Plus className="w-4 h-4" /> Añadir jugador
                </Button>

                {/* Players */}
                <div>
                  <h2 className="text-lg font-display font-bold text-foreground mb-3">Plantilla</h2>
                  {(!activeTeam.players || activeTeam.players.length === 0) ? (
                    <p className="text-sm text-muted-foreground text-center py-4 font-display">Sin jugadores aún. ¡Añade el primero!</p>
                  ) : (
                    <div className="space-y-2">
                      {activeTeam.players.map((p: any, i: number) => (
                        <motion.div key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="glass rounded-xl p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-foreground text-sm">
                            {p.number ?? "-"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-display font-semibold text-foreground">{p.name}</h3>
                              <span className={`px-2 py-0.5 text-[10px] font-display font-semibold rounded-full ${positionColor(p.position)}`}>
                                {positionLabel[p.position] || p.position}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                              {p.age && <span>{p.age} años</span>}
                              <span>⚽ {p.goals ?? 0}</span>
                              <span>🅰️ {p.assists ?? 0}</span>
                              <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-primary fill-primary" />{p.rating ?? 0}</span>
                            </div>
                          </div>
                          <button onClick={() => handleRemovePlayer(p.id)} className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-destructive/10 transition-colors">
                            <Trash2 className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            <Button variant="outline" onClick={() => setShowTeamForm(true)} className="w-full font-display gap-2">
              <Plus className="w-4 h-4" /> Crear otro equipo
            </Button>
          </>
        )}
      </div>

      {/* Create Team Dialog */}
      <Dialog open={showTeamForm} onOpenChange={setShowTeamForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle className="font-display">Crear equipo</DialogTitle></DialogHeader>
          <form onSubmit={teamForm.handleSubmit(onCreateTeam)} className="space-y-4">
            <div><Label className="font-display">Nombre</Label><Input {...teamForm.register("name")} className="mt-1" />{teamForm.formState.errors.name && <p className="text-xs text-destructive mt-1">{teamForm.formState.errors.name.message}</p>}</div>
            <div><Label className="font-display">Categoría</Label><Input placeholder="Benjamín A" {...teamForm.register("category")} className="mt-1" /></div>
            <div><Label className="font-display">Ciudad</Label><Input placeholder="Madrid" {...teamForm.register("city")} className="mt-1" /></div>
            <Button type="submit" disabled={createTeamMutation.isPending} className="w-full bg-gradient-neon text-primary-foreground font-display font-bold glow-green">
              {createTeamMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Crear equipo"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Player Dialog */}
      <Dialog open={showPlayerForm} onOpenChange={setShowPlayerForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle className="font-display">Añadir jugador</DialogTitle></DialogHeader>
          <form onSubmit={playerForm.handleSubmit(onAddPlayer)} className="space-y-4">
            <div><Label className="font-display">Nombre</Label><Input {...playerForm.register("name")} className="mt-1" />{playerForm.formState.errors.name && <p className="text-xs text-destructive mt-1">{playerForm.formState.errors.name.message}</p>}</div>
            <div>
              <Label className="font-display">Posición</Label>
              <Select value={playerForm.watch("position")} onValueChange={(v) => playerForm.setValue("position", v as PlayerPosition)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="portero">Portero</SelectItem>
                  <SelectItem value="defensa">Defensa</SelectItem>
                  <SelectItem value="centrocampista">Centrocampista</SelectItem>
                  <SelectItem value="delantero">Delantero</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="font-display">Dorsal</Label><Input type="number" {...playerForm.register("number")} className="mt-1" /></div>
              <div><Label className="font-display">Edad</Label><Input type="number" {...playerForm.register("age")} className="mt-1" /></div>
            </div>
            <Button type="submit" disabled={addPlayerMutation.isPending} className="w-full bg-gradient-neon text-primary-foreground font-display font-bold glow-green">
              {addPlayerMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Añadir jugador"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default MiEquipo;
