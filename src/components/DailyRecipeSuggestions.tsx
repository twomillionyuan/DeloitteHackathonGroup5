import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecommendedRecipes } from "../hooks/use-recommended-recipes";

const getRecipeCo2 = (recipe: { co2?: number; co2Kg?: number; carbonEstimateKg?: number }) =>
  recipe.co2 ?? recipe.co2Kg ?? recipe.carbonEstimateKg;
const getRecipeImage = (recipe: { image?: string }) => recipe.image;

export const DailyRecipeSuggestions = () => {
  const { recommendedRecipes, isLoading, generateOtherRecipes } = useRecommendedRecipes();

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
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="section-label">Suggested recipes</span>
          <button
            type="button"
            onClick={generateOtherRecipes}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Refresh recipes"
          >
            <RotateCw size={16} />
          </button>
        </div>
        <div className="grid gap-3">
          {meals.map(({ slot, recipe }) => (
            <Link
              key={`${slot}-${recipe.id}`}
              to={`/recipes/${recipe.id}`}
              state={{ from: "/" }}
              className="card-soft paper-panel relative block overflow-hidden p-5 transition-transform hover:-translate-y-0.5"
            >
              <div className="relative z-10 flex items-stretch gap-4">
                <div className="h-[120px] w-[120px] shrink-0 overflow-hidden rounded-[16px]">
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
                  <p className="mt-2 font-display text-[1.45rem] leading-tight text-foreground">
                    {recipe.name}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {typeof getRecipeCo2(recipe) === "number" ? (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {getRecipeCo2(recipe)?.toFixed(1)} kg CO₂
                      </span>
                    ) : null}
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                      {recipe.time}
                    </span>
                    {recipe.tags?.[0] ? (
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                        {recipe.tags[0]}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
