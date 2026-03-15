import { useEffect, useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock3, Users } from "lucide-react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { getRecipeById } from "../data/recipes";

type RecipeDetailLocationState = {
  from?: string;
};

const parseServings = (servingsLabel: string) => {
  const match = servingsLabel.match(/\d+/);
  return match ? Number(match[0]) : 1;
};

const formatServings = (count: number) => `${count} serving${count === 1 ? "" : "s"}`;
const LOGGED_MEALS_KEY = "logged-meals";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const location = useLocation();
  const recipe = getRecipeById(recipeId);
  const backTo = (location.state as RecipeDetailLocationState | null)?.from ?? "/recipes";
  const backLabel = backTo === "/" ? "Back to dashboard" : "Back to recipes";
  const baseServings = recipe ? parseServings(recipe.servings) : 1;
  const [selectedServings, setSelectedServings] = useState(baseServings);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setSelectedServings(baseServings);
  }, [baseServings, recipeId]);

  useEffect(() => {
    if (!recipeId || typeof window === "undefined") {
      setIsLogged(false);
      return;
    }

    const loggedMeals = JSON.parse(window.localStorage.getItem(LOGGED_MEALS_KEY) ?? "[]") as string[];
    setIsLogged(loggedMeals.includes(recipeId));
  }, [recipeId]);

  if (!recipe) {
    return <Navigate to="/recipes" replace />;
  }

  const handleLogMeal = () => {
    if (!recipeId || typeof window === "undefined") {
      return;
    }

    const loggedMeals = JSON.parse(window.localStorage.getItem(LOGGED_MEALS_KEY) ?? "[]") as string[];

    if (loggedMeals.includes(recipeId)) {
      toast({
        title: "Meal already logged",
        description: `${recipe.name} is already in your meal log.`,
      });
      return;
    }

    const nextLoggedMeals = [...loggedMeals, recipeId];
    window.localStorage.setItem(LOGGED_MEALS_KEY, JSON.stringify(nextLoggedMeals));
    setIsLogged(true);
    toast({
      title: "Meal logged",
      description: `${recipe.name} has been added to your meals.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-md px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4"
        >
          <Link
            to={backTo}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>

          <div className="card-soft paper-panel p-5">
            <div className="mb-4 overflow-hidden rounded-[26px]">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="section-label">{recipe.mealType}</span>
                <h1 className="mt-2 font-display text-[2rem] leading-none text-foreground">
                  {recipe.name}
                </h1>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
                <Clock3 size={12} />
                {recipe.time}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
                <Users size={12} />
                {formatServings(selectedServings)}
              </span>
              <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
                {recipe.co2} kg CO₂
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-[22px] border border-border px-4 py-3">
              <div>
                <span className="section-label">Servings</span>
                <p className="mt-1 text-sm text-foreground">{formatServings(selectedServings)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedServings((current) => Math.max(1, current - 1))}
                  disabled={selectedServings <= 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-lg text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease servings"
                >
                  -
                </button>
                <span className="min-w-[2ch] text-center font-display text-lg text-foreground">
                  {selectedServings}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedServings((current) => Math.min(12, current + 1))}
                  disabled={selectedServings >= 12}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-lg text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase servings"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleLogMeal}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${
                  isLogged
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {isLogged ? <Check size={16} /> : null}
                {isLogged ? "Meal logged" : "Log meal"}
              </button>
            </div>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="card-soft mt-4 p-4"
        >
          <span className="section-label mb-3 block">Ingredients for {formatServings(selectedServings)}</span>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="rounded-full">
                {ingredient}
              </Badge>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="card-soft mt-4 p-4"
        >
          <span className="section-label mb-3 block">Method</span>
          <div className="space-y-3">
            {recipe.steps.map((step, index) => (
              <div key={step} className="paper-panel flex gap-3 rounded-2xl border border-border p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
      <BottomNav />
    </div>
  );
};

export default RecipeDetailPage;
