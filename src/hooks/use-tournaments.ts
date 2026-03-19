import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tournamentsService } from "@/services/tournaments.service";
import type { TournamentInput } from "@/lib/schemas";
import type { TournamentStatus } from "@/types/domain";
import { toast } from "sonner";

export const useTournaments = (status?: TournamentStatus) =>
  useQuery({
    queryKey: ["tournaments", status],
    queryFn: () => tournamentsService.getAll(status),
    staleTime: 1000 * 60 * 5,
  });

export const useTournament = (id: string) =>
  useQuery({
    queryKey: ["tournament", id],
    queryFn: () => tournamentsService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

export const useOrganizerTournaments = (organizerId: string) =>
  useQuery({
    queryKey: ["organizer-tournaments", organizerId],
    queryFn: () => tournamentsService.getByOrganizer(organizerId),
    enabled: !!organizerId,
    staleTime: 1000 * 60 * 5,
  });

export const useSearchTournaments = (query: string, category?: string) =>
  useQuery({
    queryKey: ["search-tournaments", query, category],
    queryFn: () => tournamentsService.search(query, category),
    staleTime: 1000 * 60 * 2,
  });

export const useCreateTournament = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ input, organizerId }: { input: TournamentInput; organizerId: string }) =>
      tournamentsService.create(input, organizerId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tournaments"] });
      qc.invalidateQueries({ queryKey: ["organizer-tournaments"] });
      toast.success("Torneo creado con éxito");
    },
    onError: (e: Error) => toast.error(`Error al crear torneo: ${e.message}`),
  });
};

export const useUpdateTournamentStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TournamentStatus }) =>
      tournamentsService.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tournaments"] });
      qc.invalidateQueries({ queryKey: ["organizer-tournaments"] });
      toast.success("Estado actualizado");
    },
    onError: (e: Error) => toast.error(`Error: ${e.message}`),
  });
};
