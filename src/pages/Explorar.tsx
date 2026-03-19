import { motion } from "framer-motion";
import { Search, Filter, MapPin, Star, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchTournaments } from "@/hooks/use-tournaments";
import { TournamentCardSkeleton } from "@/components/shared/Skeletons";
import EmptyState from "@/components/shared/EmptyState";

const categories = ["Todos", "Prebenjamín", "Benjamín", "Alevín", "Infantil", "Cadete", "Juvenil"];
const trendingSearches = ["Copa Verano 2026", "Torneos Madrid", "Benjamín Cataluña", "MIC", "Donosti Cup"];

const Explorar = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const navigate = useNavigate();
  const { data: tournaments, isLoading } = useSearchTournaments(search, activeCategory);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 glass border-b border-border/50 px-4 pt-12 pb-4">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-display font-bold text-foreground mb-4">
          Explorar
        </motion.h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar torneos, ciudades..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border/50 font-display text-sm" />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Filter className="w-4 h-4 text-accent" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-6 mt-4">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-display font-semibold text-foreground">Tendencias</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {trendingSearches.map((term) => (
              <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors font-display text-xs" onClick={() => setSearch(term)}>
                {term}
              </Badge>
            ))}
          </div>
        </section>

        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-xs font-display font-semibold whitespace-nowrap transition-all ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>

        <section>
          <p className="text-sm text-muted-foreground mb-3 font-display">{tournaments?.length ?? 0} torneos encontrados</p>
          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <TournamentCardSkeleton key={i} />)
            ) : !tournaments?.length ? (
              <EmptyState
                title="Sin resultados"
                description="No se encontraron torneos con esos filtros."
                actionLabel="Limpiar filtros"
                onAction={() => { setSearch(""); setActiveCategory("Todos"); }}
              />
            ) : (
              tournaments.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 glass rounded-xl p-3 cursor-pointer hover:border-primary/30 border border-transparent transition-all"
                  onClick={() => navigate(`/torneo/${t.id}`)}
                >
                  <img src={t.image_url || "/placeholder.svg"} alt={t.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-foreground text-sm truncate">{t.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 text-accent" />
                      <span>{t.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-display">{t.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-primary fill-primary" />
                          <span className="text-xs font-semibold text-foreground">{t.rating ?? 0}</span>
                        </div>
                        <span className="text-sm font-display font-bold text-primary">
                          {(t.price ?? 0) === 0 ? "Gratis" : `€${t.price}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Explorar;
