import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getCo2Label, getDailyRecipeSuggestions } from "../data/recipes";
import { useEffect, useState } from "react";
const todaysSuggestions = getDailyRecipeSuggestions();
const dateLabel = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
}).format(new Date());

export const DailyRecipeSuggestions = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/daily-recipe?target_calories=500")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch recipes:", err);
        setLoading(false);
      });
  }, []);

  const meals = [
    { slot: "Lunch", recipe: recipes[0] },
    { slot: "Dinner", recipe: recipes[1] },
  ];

  if (loading) return <p className="text-muted-foreground text-sm">Loading today's recipes...</p>;
  if (!recipes.length) return <p className="text-muted-foreground text-sm">No recipes found.</p>;


  return (
    <section>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="card-soft paper-panel p-5"
      >
        <div className="border-b border-border pb-4">
          <div>
            <span className="section-label">Today's kitchen plan</span>
            <h2 className="mt-2 font-display text-[1.7rem] leading-none text-foreground">
              {dateLabel}
            </h2>
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          {meals.map(({ slot, recipe }) => (
            <Link
              key={`${slot}-${recipe.id}`}
              to={`/recipes/${recipe.id}`}
              className="rounded-[22px] border border-border bg-background/75 p-3 transition-shadow hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="paper-panel flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border text-2xl">
                  {recipe.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="section-label">{slot}</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                      {recipe.time}
                    </span>
                  </div>
                  <p className="mt-1 font-display text-[1.05rem] leading-none text-foreground">
                    {recipe.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
