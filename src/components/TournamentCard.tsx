import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react";

interface Tournament {
  id: number;
  name: string;
  location: string;
  date: string;
  category: string;
  price: number;
  teams: number;
  maxTeams: number;
  rating: number;
  image: string;
  featured?: boolean;
  spotsLeft?: number;
}

const TournamentCard = ({ tournament, index }: { tournament: Tournament; index: number }) => {
  const fillPercent = Math.round((tournament.teams / tournament.maxTeams) * 100);
  const isAlmostFull = fillPercent > 80;

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden glass cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={tournament.image} alt={tournament.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 text-xs font-display font-semibold rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
            {tournament.category}
          </span>
          {tournament.featured && (
            <span className="px-3 py-1 text-xs font-display font-semibold rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm animate-pulse-glow">
              DESTACADO
            </span>
          )}
        </div>

        {isAlmostFull && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-display font-semibold rounded-full bg-pulse/20 text-pulse border border-pulse/30 backdrop-blur-sm">
              ¡{tournament.spotsLeft || tournament.maxTeams - tournament.teams} plazas!
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
            <span>{tournament.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-3.5 h-3.5 text-accent" />
            <span>{tournament.teams}/{tournament.maxTeams} equipos</span>
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
            <span className="text-sm font-semibold text-foreground">{tournament.rating}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-bold text-primary">€{tournament.price}</span>
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
export type { Tournament };
