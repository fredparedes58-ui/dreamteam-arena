import HeroSection from "@/components/HeroSection";
import TournamentCard from "@/components/TournamentCard";
import CategoryFilter from "@/components/CategoryFilter";
import BottomNav from "@/components/BottomNav";
import LivePulse from "@/components/LivePulse";
import QuickStats from "@/components/QuickStats";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";

import tournament1 from "@/assets/tournament-1.jpg";
import tournament2 from "@/assets/tournament-2.jpg";
import tournament3 from "@/assets/tournament-3.jpg";
import tournament4 from "@/assets/tournament-4.jpg";

const tournaments = [
  {
    id: 1,
    name: "Costa Daurada Cup 2026",
    location: "Salou, Tarragona",
    date: "15-19 Junio 2026",
    category: "Benjamín",
    price: 195,
    teams: 52,
    maxTeams: 64,
    rating: 4.8,
    image: tournament1,
    featured: true,
    spotsLeft: 12,
  },
  {
    id: 2,
    name: "Pirineos Youth Championship",
    location: "Jaca, Huesca",
    date: "22-25 Julio 2026",
    category: "Alevín",
    price: 220,
    teams: 38,
    maxTeams: 48,
    rating: 4.9,
    image: tournament2,
    featured: true,
    spotsLeft: 10,
  },
  {
    id: 3,
    name: "Mediterranean Cup",
    location: "Palma, Mallorca",
    date: "5-8 Agosto 2026",
    category: "Infantil",
    price: 250,
    teams: 20,
    maxTeams: 32,
    rating: 4.6,
    image: tournament3,
  },
  {
    id: 4,
    name: "Madrid Night League",
    location: "Madrid",
    date: "10-12 Julio 2026",
    category: "Cadete",
    price: 180,
    teams: 14,
    maxTeams: 16,
    rating: 4.7,
    image: tournament4,
    spotsLeft: 2,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <HeroSection />

      <div className="max-w-6xl mx-auto px-4 space-y-8 -mt-8 relative z-20">
        {/* Live Pulse */}
        <LivePulse />

        {/* Quick Stats */}
        <QuickStats />

        {/* Tournaments Section */}
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
            <button className="text-sm text-accent font-display hover:underline">Ver todos</button>
          </motion.div>

          <CategoryFilter />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-4">
            {tournaments.map((tournament, i) => (
              <TournamentCard key={tournament.id} tournament={tournament} index={i} />
            ))}
          </div>
        </section>

        {/* CTA for organizers */}
        <CTASection />
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
