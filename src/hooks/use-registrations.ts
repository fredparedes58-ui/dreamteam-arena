import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { registrationsService } from "@/services/registrations.service";
import type { RegistrationStatus } from "@/types/domain";
import { toast } from "sonner";

export const useMyRegistrations = (userId: string) =>
  useQuery({
    queryKey: ["my-registrations", userId],
    queryFn: () => registrationsService.getByUser(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

export const useTournamentRegistrations = (tournamentId: string) =>
  useQuery({
    queryKey: ["tournament-registrations", tournamentId],
    queryFn: () => registrationsService.getByTournament(tournamentId),
    enabled: !!tournamentId,
    staleTime: 1000 * 60 * 2,
  });

export const useRegisterTeam = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ tournamentId, teamId, userId }: { tournamentId: string; teamId: string; userId: string }) =>
      registrationsService.create(tournamentId, teamId, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-registrations"] });
      qc.invalidateQueries({ queryKey: ["tournament-registrations"] });
      toast.success("Inscripción realizada con éxito");
    },
    onError: (e: Error) => toast.error(`Error en inscripción: ${e.message}`),
  });
};

export const useUpdateRegistrationStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: RegistrationStatus }) =>
      registrationsService.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-registrations"] });
      qc.invalidateQueries({ queryKey: ["tournament-registrations"] });
      toast.success("Estado de inscripción actualizado");
    },
    onError: (e: Error) => toast.error(`Error: ${e.message}`),
  });
};
