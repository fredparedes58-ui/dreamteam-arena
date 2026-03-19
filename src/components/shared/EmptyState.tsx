import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => (
  <motion.div
    className="flex flex-col items-center justify-center py-16 px-6 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-display font-bold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground max-w-xs mb-6">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction} className="bg-gradient-neon text-primary-foreground font-display">
        {actionLabel}
      </Button>
    )}
  </motion.div>
);

export default EmptyState;
