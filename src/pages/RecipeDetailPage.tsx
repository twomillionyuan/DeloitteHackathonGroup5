import { BottomNav } from "../components/BottomNav";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowLeft, Clock3, Leaf, Users } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getCo2Label, getRecipeById } from "../data/recipes";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const recipe = getRecipeById(recipeId);

  if (!recipe) {
    return <Navigate to="/recipes" replace />;
  }

  const co2Info = getCo2Label(recipe.co2);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-md px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4"
        >
          <Link
            to="/recipes"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to recipes
          </Link>

          <div
            className="rounded-[28px] p-5 text-primary-foreground shadow-sm"
            style={{ background: "var(--eco-gradient)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="section-label text-primary-foreground/80">{recipe.mealType}</span>
                <h1 className="mt-2 font-display text-3xl font-extrabold">
                  {recipe.emoji} {recipe.name}
                </h1>
                <p className="mt-2 text-sm text-primary-foreground/80">{recipe.desc}</p>
              </div>
              <Leaf className="shrink-0" size={22} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                <Clock3 size={12} />
                {recipe.time}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                <Users size={12} />
                {recipe.servings}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                {recipe.co2} kg CO₂
              </span>
            </div>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-soft p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="section-label">Why make this</span>
            <Badge className={`rounded-full ${co2Info.className}`}>{co2Info.text}</Badge>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{recipe.highlight}</p>
        </motion.section>

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
              <div key={step} className="flex gap-3 rounded-2xl bg-secondary/60 p-3">
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
