import HeroSection from "@/components/HeroSection";
import TournamentCard from "@/components/TournamentCard";
import CategoryFilter from "@/components/CategoryFilter";
import BottomNav from "@/components/BottomNav";
import LivePulse from "@/components/LivePulse";
import QuickStats from "@/components/QuickStats";
import CTASection from "@/components/CTASection";
import ProjectEvaluator from "@/components/ProjectEvaluator";
import AppMockups from "@/components/AppMockups";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchTournaments } from "@/hooks/use-tournaments";
import { TournamentCardSkeleton } from "@/components/shared/Skeletons";

const Index = () => {
  const [category, setCategory] = useState("Todos");
  const { data: tournaments, isLoading } = useSearchTournaments("", category);

  const featured = (tournaments ?? []).slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-24">
      <HeroSection />

      <div className="max-w-6xl mx-auto px-4 space-y-8 -mt-8 relative z-20">
        <LivePulse />
        <QuickStats />

        <section>
          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              Torneos <span className="text-gradient-neon">Destacados</span>
            </h2>
            <button onClick={() => window.location.href = "/torneos"} className="text-sm text-accent font-display hover:underline">Ver todos</button>
          </motion.div>

          <CategoryFilter active={category} onChange={setCategory} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <TournamentCardSkeleton key={i} />)
              : featured.map((t, i) => <TournamentCard key={t.id} tournament={t} index={i} />)
            }
          </div>
        </section>

        <CTASection />
        <AppMockups />
        <ProjectEvaluator />
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
