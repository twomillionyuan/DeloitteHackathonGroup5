import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecommendedRecipes } from "../hooks/use-recommended-recipes";

const getRecipeCo2 = (recipe: { co2?: number; co2Kg?: number; carbonEstimateKg?: number }) =>
  recipe.co2 ?? recipe.co2Kg ?? recipe.carbonEstimateKg;
const getRecipeImage = (recipe: { image?: string }) => recipe.image;

interface DailyRecipeSuggestionsProps {
  compact?: boolean;
}

export const DailyRecipeSuggestions = ({ compact = false }: DailyRecipeSuggestionsProps) => {
  const { recommendedRecipes, isLoading, refreshRecipe } = useRecommendedRecipes();

  const meals = [
    { slot: "Recipe 1", recipe: recommendedRecipes[0] },
    { slot: "Recipe 2", recipe: recommendedRecipes[1] },
  ];

  if (isLoading) return <p className="text-muted-foreground text-sm">Loading today's recipes...</p>;
  if (!recommendedRecipes.length || !recommendedRecipes[0] || !recommendedRecipes[1]) return <p className="text-muted-foreground text-sm">No recipes found.</p>;


  return (
    <section>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="card-soft paper-panel"
      >
        <div className={compact ? "mb-3" : "mb-3"}>
          <span className="section-label">Suggested recipes</span>
        </div>
        <div className={compact ? "grid gap-3" : "grid gap-3"}>
          {meals.map(({ slot, recipe }, index) => (
            <div key={`${slot}-${recipe.id}`} className="relative">
              <button
                type="button"
                onClick={() => refreshRecipe(index)}
                className={`absolute z-20 inline-flex items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:border-primary hover:text-primary ${
                  compact ? "right-3.5 top-3.5 h-9 w-9" : "right-5 top-5 h-9 w-9"
                }`}
                aria-label={`Refresh ${slot.toLowerCase()}`}
              >
                <RotateCw size={compact ? 13 : 14} />
              </button>
              <Link
                to={`/recipes/${recipe.id}`}
                state={{ from: "/" }}
                className={`relative block overflow-hidden rounded-[17px] border border-border bg-white transition-transform hover:-translate-y-0.5 ${
                  compact ? "p-4 pr-13" : "p-5 pr-16"
                }`}
              >
                <div className={`relative z-10 flex items-stretch ${compact ? "gap-3" : "gap-4"}`}>
                  <div
                    className={`shrink-0 overflow-hidden rounded-[16px] ${
                      compact ? "h-[104px] w-[104px]" : "h-[120px] w-[120px]"
                    }`}
                  >
                    {getRecipeImage(recipe) ? (
                      <img
                        src={getRecipeImage(recipe)}
                        alt={recipe.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="paper-panel flex h-full w-full items-center justify-center rounded-[16px] border border-border text-4xl">
                        {recipe.emoji}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="section-label">{slot}</span>
                    <p
                      className={`font-display leading-tight text-foreground ${
                        compact ? "mt-2 text-[1.18rem]" : "mt-2 text-[1.45rem]"
                      }`}
                    >
                      {recipe.name}
                    </p>
                    <div className={`flex flex-wrap items-center gap-2 ${compact ? "mt-3" : "mt-4"}`}>
                      {typeof getRecipeCo2(recipe) === "number" ? (
                        <span
                          className={`rounded-full bg-primary/10 font-medium text-primary ${
                            compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1 text-xs"
                          }`}
                        >
                          {getRecipeCo2(recipe)?.toFixed(1)} kg CO₂
                        </span>
                      ) : null}
                      <span
                        className={`rounded-full bg-secondary font-medium text-foreground ${
                          compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1 text-xs"
                        }`}
                      >
                        {recipe.time}
                      </span>
                      {recipe.tags?.[0] ? (
                        <span
                          className={`rounded-full bg-secondary font-medium text-foreground ${
                            compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1 text-xs"
                          }`}
                        >
                          {recipe.tags[0]}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
