import { BottomNav } from "../components/BottomNav";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowLeft, Clock3, Users } from "lucide-react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { getRecipeById } from "../data/recipes";

type RecipeDetailLocationState = {
  from?: string;
};

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const location = useLocation();
  const recipe = getRecipeById(recipeId);
  const backTo = (location.state as RecipeDetailLocationState | null)?.from ?? "/recipes";
  const backLabel = backTo === "/" ? "Back to dashboard" : "Back to recipes";

  if (!recipe) {
    return <Navigate to="/recipes" replace />;
  }
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
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="section-label">{recipe.mealType}</span>
                <h1 className="mt-2 font-display text-[2rem] leading-none text-foreground">
                  {recipe.emoji} {recipe.name}
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
                {recipe.servings}
              </span>
              <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
                {recipe.co2} kg CO₂
              </span>
            </div>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="card-soft mt-4 p-4"
        >
          <span className="section-label mb-3 block">Ingredients</span>
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
