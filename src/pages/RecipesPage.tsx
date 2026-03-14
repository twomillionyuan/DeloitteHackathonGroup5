import { BottomNav } from "../components/BottomNav";
import { PantryRecipeGenerator } from "../components/PantryRecipeGenerator";
import { motion } from "framer-motion";
import { Clock, Leaf, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getCo2Label, recipes } from "../data/recipes";

const RecipesPage = () => {
  const featuredRecipe = recipes[0];

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
          className="mb-4"
        >
          <Link
            to={`/recipes/${featuredRecipe.id}`}
            className="card-soft relative block overflow-hidden p-5 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--eco-gradient)" }}
          >
            <div className="relative z-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
                Today's Pick
              </span>
              <h2 className="mt-1 font-display text-xl font-extrabold text-primary-foreground">
                {featuredRecipe.emoji} {featuredRecipe.name}
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Only {featuredRecipe.co2} kg CO₂. {featuredRecipe.highlight}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-primary-foreground">
                  {featuredRecipe.time}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-primary-foreground">
                  {featuredRecipe.tags[0]}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <PantryRecipeGenerator />

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
                className="transition-transform hover:-translate-y-0.5"
              >
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="card-soft flex items-center gap-3 p-4 transition-shadow hover:shadow-md"
                >
                  <span className="text-3xl">{recipe.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{recipe.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{recipe.desc}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${co2Info.className}`}>
                        {recipe.co2} kg CO₂ · {co2Info.text}
                      </span>
                      <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <Clock size={10} /> {recipe.time}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-muted-foreground" />
                </Link>
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
