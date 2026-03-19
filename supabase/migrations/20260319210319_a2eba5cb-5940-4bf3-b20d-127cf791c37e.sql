
-- Fix: Replace overly permissive notification insert policy with service_role only
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

-- Notifications are inserted via service_role (edge functions/triggers), 
-- so we restrict insert to authenticated users for their own notifications
CREATE POLICY "Authenticated can receive notifications" ON public.notifications 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
