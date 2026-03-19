import { motion } from "framer-motion";

const categories = [
  { id: "Todos", label: "Todos", emoji: "⚡" },
  { id: "Prebenjamín", label: "Prebenjamín", emoji: "🌱" },
  { id: "Benjamín", label: "Benjamín", emoji: "🏃" },
  { id: "Alevín", label: "Alevín", emoji: "⭐" },
  { id: "Infantil", label: "Infantil", emoji: "🔥" },
  { id: "Cadete", label: "Cadete", emoji: "💪" },
  { id: "Juvenil", label: "Juvenil", emoji: "🎯" },
];

interface CategoryFilterProps {
  active?: string;
  onChange?: (category: string) => void;
}

const CategoryFilter = ({ active = "Todos", onChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1">
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          onClick={() => onChange?.(cat.id)}
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
