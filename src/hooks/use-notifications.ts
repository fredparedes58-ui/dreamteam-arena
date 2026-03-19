import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "@/services/notifications.service";
import { toast } from "sonner";

export const useNotifications = (userId: string) =>
  useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => notificationsService.getByUser(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 2,
  });

export const useMarkNotificationRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationsService.markAsRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
};

export const useMarkAllNotificationsRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => notificationsService.markAllAsRead(userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Todas las notificaciones marcadas como leídas");
    },
  });
};
