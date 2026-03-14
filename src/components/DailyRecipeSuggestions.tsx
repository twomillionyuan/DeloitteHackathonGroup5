import { motion } from "framer-motion";
import { Clock, Leaf, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getCo2Label, getDailyRecipeSuggestions } from "../data/recipes";

const todaysSuggestions = getDailyRecipeSuggestions();
const dateLabel = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
}).format(new Date());

export const DailyRecipeSuggestions = () => {
  const meals = [
    { slot: "Lunch", recipe: todaysSuggestions.lunch },
    { slot: "Dinner", recipe: todaysSuggestions.dinner },
  ];

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="rounded-[28px] p-5 text-primary-foreground shadow-sm"
        style={{ background: "var(--eco-gradient)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-foreground/90">
              <Sparkles size={12} />
              Daily plan
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold">
              Two meals to cook today
            </h2>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Personalized low-carbon picks for {dateLabel}.
            </p>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Leaf size={20} />
          </div>
        </div>
      </motion.div>

      <div className="mt-4 space-y-3">
        {meals.map(({ slot, recipe }, index) => {
          const co2Info = getCo2Label(recipe.co2);

          return (
            <motion.article
              key={`${slot}-${recipe.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + index * 0.08 }}
              className="transition-transform hover:-translate-y-0.5"
            >
              <Link to={`/recipes/${recipe.id}`} className="card-soft block p-4 transition-shadow hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-3xl">
                    {recipe.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="section-label">{slot}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${co2Info.className}`}>
                        {recipe.co2} kg CO₂
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-lg font-extrabold text-foreground">
                      {recipe.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {recipe.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 font-medium text-foreground">
                    <Clock size={12} />
                    {recipe.time}
                  </span>
                  {recipe.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-3 py-1 font-medium text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {recipe.highlight}
                </p>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
