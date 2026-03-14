import { BottomNav } from "../components/BottomNav";
import { PantryRecipeGenerator } from "../components/PantryRecipeGenerator";
import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
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
          <span className="section-label">Recipe library</span>
          <h1 className="mt-2 font-display text-[2rem] leading-none text-foreground">
            Recipes
          </h1>
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
            state={{ from: "/recipes" }}
            className="card-soft paper-panel relative block overflow-hidden p-5 transition-transform hover:-translate-y-0.5"
          >
            <div className="relative z-10">
              <span className="section-label">Editor's pick</span>
              <h2 className="mt-2 font-display text-[1.7rem] leading-none text-foreground">
                {featuredRecipe.emoji} {featuredRecipe.name}
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {featuredRecipe.time}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                  {featuredRecipe.tags[0]}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                  {featuredRecipe.servings}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="mb-6">
          <PantryRecipeGenerator />
        </div>

        <div className="mb-3 flex items-center justify-between">
          <span className="section-label">All recipes</span>
          <span className="text-xs text-muted-foreground">{recipes.length}</span>
        </div>
        <div className="space-y-3">
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
                  state={{ from: "/recipes" }}
                  className="card-soft block p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="paper-panel flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border text-3xl">
                      {recipe.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-display text-[1.2rem] leading-none text-foreground">{recipe.name}</p>
                        <ChevronRight size={16} className="shrink-0 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${co2Info.className}`}>
                      {recipe.co2} kg CO₂ · {co2Info.text}
                    </span>
                    <span className="flex items-center gap-0.5 rounded-full bg-secondary px-3 py-1 text-[10px] font-medium text-foreground">
                      <Clock size={10} /> {recipe.time}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-medium text-foreground">
                      {recipe.servings}
                    </span>
                    {recipe.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-[10px] font-medium text-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default RecipesPage;
