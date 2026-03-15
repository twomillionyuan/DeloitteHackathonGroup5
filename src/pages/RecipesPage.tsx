import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { useRecommendedRecipes } from "../hooks/use-recommended-recipes";
import { motion } from "framer-motion";
import { Clock, ChevronRight, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { getCo2Label, recipes } from "../data/recipes";

const recipeFilters = ["All", "Lunch", "Dinner", "Vegan", "Veggie"] as const;

const RecipesPage = () => {
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof recipeFilters)[number]>("All");
  const {
    recommendedRecipes: syncedRecommendedRecipes,
    isLoading,
    refreshRecipe,
  } = useRecommendedRecipes();
  const recommendedRecipeCards = [
    { label: "Recommended 1", recipe: syncedRecommendedRecipes[0] },
    { label: "Recommended 2", recipe: syncedRecommendedRecipes[1] },
  ];
  const filteredRecipes = recipes.filter((recipe) => {
    const normalizedSearch = search.trim().toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      recipe.name.toLowerCase().includes(normalizedSearch) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

    const matchesFilter =
      activeFilter === "All" ||
      recipe.mealType === activeFilter ||
      recipe.tags.includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4"
        >
          <h1 className="font-display text-[2rem] leading-none text-foreground">
            Recipes
          </h1>
        </motion.header>

        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="section-label">Suggested recipes</span>
        </div>

        {/* Recommended dishes */}
        {isLoading ? (
          <p className="mb-4 text-sm text-muted-foreground">Loading recommended recipes...</p>
        ) : recommendedRecipeCards.every(({ recipe }) => recipe) ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4 grid gap-3"
          >
            {recommendedRecipeCards.map(({ label, recipe }, index) => (
              (() => {
                const co2Info = getCo2Label(recipe.co2 ?? recipe.co2Kg ?? recipe.carbonEstimateKg ?? 0);
                return (
                  <div key={`${label}-${recipe.id}`} className="relative">
                    <button
                      type="button"
                      onClick={() => refreshRecipe(index)}
                      className="absolute right-5 top-5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:border-primary hover:text-primary"
                      aria-label={`Refresh ${label.toLowerCase()}`}
                    >
                      <RotateCw size={14} />
                    </button>
                    <Link
                      to={`/recipes/${recipe.id}`}
                      state={{ from: "/recipes" }}
                      className="relative block overflow-hidden rounded-[17px] border border-border bg-white p-5 pr-16 transition-transform hover:-translate-y-0.5"
                    >
                      <div className="relative z-10 flex items-stretch gap-4">
                        <div className="h-[120px] w-[120px] shrink-0 overflow-hidden rounded-[16px]">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="section-label">{label}</span>
                          <h2 className="mt-2 font-display text-[1.45rem] leading-tight text-foreground">
                            {recipe.name}
                          </h2>
                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${co2Info.className}`}>
                              {(recipe.co2 ?? recipe.co2Kg ?? recipe.carbonEstimateKg ?? 0).toFixed(1)} kg CO₂
                            </span>
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
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
                  </div>
                );
              })()
            ))}
          </motion.div>
        ) : (
          <p className="mb-4 text-sm text-muted-foreground">No recommended recipes found.</p>
        )}
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAllRecipes((current) => !current)}
            className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            {showAllRecipes ? "Hide recipes" : "Browse all recipes"}
          </button>
          <span className="text-xs text-muted-foreground">{recipes.length}</span>
        </div>

        {showAllRecipes ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-2"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="section-label">All recipes</span>
              <span className="text-xs text-muted-foreground">{recipes.length}</span>
            </div>
            <div className="mb-4 space-y-3">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search recipes"
                className="h-11 w-full rounded-full border border-border px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
              <div className="flex flex-wrap gap-2">
                {recipeFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      activeFilter === filter
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {filteredRecipes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recipes match that search.</p>
            ) : (
              <div className="space-y-3">
                {filteredRecipes.map((recipe, i) => {
                  const co2Info = getCo2Label(recipe.co2);
                  return (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                      className="transition-transform hover:-translate-y-0.5"
                    >
                      <Link
                        to={`/recipes/${recipe.id}`}
                        state={{ from: "/recipes" }}
                        className="block rounded-[17px] border border-border bg-white p-4 transition-shadow hover:shadow-md"
                      >
                        <div className="flex items-stretch gap-4">
                          <div className="h-[120px] w-[120px] shrink-0 overflow-hidden rounded-[16px]">
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1 py-1">
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-display text-[1.2rem] leading-tight text-foreground">{recipe.name}</p>
                              <ChevronRight size={16} className="shrink-0 text-muted-foreground" />
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${co2Info.className}`}>
                                {recipe.co2} kg CO₂ · {co2Info.text}
                              </span>
                              <span className="flex items-center gap-0.5 rounded-full bg-secondary px-3 py-1 text-[10px] font-medium text-foreground">
                                <Clock size={10} /> {recipe.time}
                              </span>
                              {recipe.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-[10px] font-medium text-foreground">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ) : null}
      </div>
      <BottomNav />
    </div>
  );
};

export default RecipesPage;
