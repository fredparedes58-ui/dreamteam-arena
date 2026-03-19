import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamsService } from "@/services/teams.service";
import type { TeamInput, PlayerInput } from "@/lib/schemas";
import { toast } from "sonner";

export const useMyTeams = (ownerId: string) =>
  useQuery({
    queryKey: ["my-teams", ownerId],
    queryFn: () => teamsService.getByOwner(ownerId),
    enabled: !!ownerId,
    staleTime: 1000 * 60 * 5,
  });

export const useTeam = (id: string) =>
  useQuery({
    queryKey: ["team", id],
    queryFn: () => teamsService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateTeam = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ input, ownerId }: { input: TeamInput; ownerId: string }) =>
      teamsService.create(input, ownerId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-teams"] });
      toast.success("Equipo creado con éxito");
    },
    onError: (e: Error) => toast.error(`Error: ${e.message}`),
  });
};

export const useAddPlayer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ input, teamId }: { input: PlayerInput; teamId: string }) =>
      teamsService.addPlayer(input, teamId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-teams"] });
      qc.invalidateQueries({ queryKey: ["team"] });
      toast.success("Jugador añadido");
    },
    onError: (e: Error) => toast.error(`Error: ${e.message}`),
  });
};
