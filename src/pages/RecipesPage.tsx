import { BottomNav } from "../components/BottomNav";
import { motion } from "framer-motion";
import { Clock, Leaf, ChevronRight, Sparkles } from "lucide-react";

interface Recipe {
  id: string;
  name: string;
  desc: string;
  co2: number;
  time: string;
  tags: string[];
  emoji: string;
}

const recipes: Recipe[] = [
  { id: "1", name: "Chickpea Curry Bowl", desc: "Creamy coconut curry with spinach and rice", co2: 0.4, time: "25 min", tags: ["Vegan", "High Protein"], emoji: "🍛" },
  { id: "2", name: "Mushroom Risotto", desc: "Creamy arborio rice with mixed mushrooms", co2: 0.5, time: "35 min", tags: ["Veggie", "Comfort"], emoji: "🍄" },
  { id: "3", name: "Lentil Bolognese", desc: "Rich tomato sauce with red lentils and herbs", co2: 0.3, time: "30 min", tags: ["Vegan", "Budget"], emoji: "🍝" },
  { id: "4", name: "Grilled Halloumi Salad", desc: "Mediterranean salad with roasted vegetables", co2: 0.7, time: "15 min", tags: ["Veggie", "Quick"], emoji: "🥗" },
  { id: "5", name: "Sweet Potato Tacos", desc: "Spiced sweet potato with avocado crema", co2: 0.3, time: "20 min", tags: ["Vegan", "Fun"], emoji: "🌮" },
  { id: "6", name: "Tofu Stir-Fry", desc: "Sesame tofu with crunchy vegetables and noodles", co2: 0.4, time: "20 min", tags: ["Vegan", "Asian"], emoji: "🥘" },
];

const getCo2Label = (co2: number) => {
  if (co2 <= 0.4) return { text: "Super Low", className: "text-eco-good bg-eco-good/10" };
  if (co2 <= 0.7) return { text: "Low", className: "text-accent bg-accent/10" };
  return { text: "Moderate", className: "text-eco-warn bg-[hsl(var(--eco-warn)/0.1)]" };
};

const RecipesPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4"
        >
          <h1 className="font-display text-2xl font-extrabold text-foreground flex items-center gap-2">
            <Sparkles size={22} className="text-primary" />
            Recipe Ideas
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Delicious meals, low carbon footprint
          </p>
        </motion.header>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-soft p-5 mb-4 overflow-hidden relative"
          style={{ background: "var(--eco-gradient)" }}
        >
          <div className="relative z-10">
            <span className="text-xs font-semibold text-primary-foreground/80 uppercase tracking-wider">
              Today's Pick
            </span>
            <h2 className="font-display text-xl font-extrabold text-primary-foreground mt-1">
              🍛 Chickpea Curry Bowl
            </h2>
            <p className="text-sm text-primary-foreground/80 mt-1">
              Only 0.4 kg CO₂ — that's 85% less than a beef dish!
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs bg-white/20 rounded-full px-3 py-1 text-primary-foreground font-medium">
                25 min
              </span>
              <span className="text-xs bg-white/20 rounded-full px-3 py-1 text-primary-foreground font-medium">
                Vegan
              </span>
            </div>
          </div>
        </motion.div>

        {/* Recipe List */}
        <span className="section-label mb-3 block">All Recipes</span>
        <div className="space-y-2">
          {recipes.map((recipe, i) => {
            const co2Info = getCo2Label(recipe.co2);
            return (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="card-soft p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{recipe.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{recipe.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{recipe.desc}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${co2Info.className}`}>
                      {recipe.co2} kg CO₂ · {co2Info.text}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Clock size={10} /> {recipe.time}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground shrink-0" />
              </motion.div>
            );
          })}
        </div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card-soft p-4 mt-6 border-primary/20"
        >
          <div className="flex items-start gap-3">
            <Leaf size={18} className="text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Swapping beef for lentils just <span className="font-semibold text-foreground">once a week</span> saves
              ~<span className="font-semibold text-eco-good">200 kg CO₂</span> per year.
              That's like skipping a flight to London! ✈️
            </p>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default RecipesPage;
