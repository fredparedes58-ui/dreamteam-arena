import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Tournament } from "@/types/domain";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const TournamentCard = ({ tournament, index }: { tournament: Tournament; index: number }) => {
  const navigate = useNavigate();
  const currentTeams = tournament.current_teams ?? 0;
  const maxTeams = tournament.max_teams ?? 16;
  const fillPercent = Math.round((currentTeams / maxTeams) * 100);
  const isAlmostFull = fillPercent > 80;
  const spotsLeft = maxTeams - currentTeams;

  const dateStr = tournament.start_date
    ? format(new Date(tournament.start_date), "d MMM yyyy", { locale: es })
    : "Por confirmar";

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden glass cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/torneo/${tournament.id}`)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tournament.image_url || "/placeholder.svg"}
          alt={tournament.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 text-xs font-display font-semibold rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
            {tournament.category}
          </span>
          {tournament.status === "live" && (
            <span className="px-3 py-1 text-xs font-display font-semibold rounded-full bg-pulse/20 text-pulse border border-pulse/30 backdrop-blur-sm animate-pulse-glow">
              EN VIVO
            </span>
          )}
        </div>

        {isAlmostFull && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-display font-semibold rounded-full bg-pulse/20 text-pulse border border-pulse/30 backdrop-blur-sm">
              ¡{spotsLeft} plazas!
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {tournament.name}
        </h3>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>{tournament.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>{dateStr}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-3.5 h-3.5 text-accent" />
            <span>{currentTeams}/{maxTeams} equipos</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${isAlmostFull ? 'bg-pulse' : 'bg-primary'}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${fillPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-semibold text-foreground">{tournament.rating ?? 0}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-bold text-primary">
              {(tournament.price ?? 0) === 0 ? "Gratis" : `€${tournament.price}`}
            </span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowRight className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TournamentCard;
