import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  { id: "all", label: "Todos", emoji: "⚡" },
  { id: "prebenjamin", label: "Prebenjamín", emoji: "🌱" },
  { id: "benjamin", label: "Benjamín", emoji: "🏃" },
  { id: "alevin", label: "Alevín", emoji: "⭐" },
  { id: "infantil", label: "Infantil", emoji: "🔥" },
  { id: "cadete", label: "Cadete", emoji: "💪" },
  { id: "juvenil", label: "Juvenil", emoji: "🎯" },
];

const CategoryFilter = () => {
  const [active, setActive] = useState("all");

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1">
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          onClick={() => setActive(cat.id)}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-display font-medium transition-all ${
            active === cat.id
              ? "bg-primary text-primary-foreground glow-green"
              : "glass text-muted-foreground hover:text-foreground"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-1.5">{cat.emoji}</span>
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
