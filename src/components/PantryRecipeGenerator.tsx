import { startTransition, useDeferredValue, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChefHat, Loader2, Sparkles, WandSparkles } from "lucide-react";
import { generatePantryRecipe, parsePantryIngredients, type PantryRecipe } from "@/lib/pantry-recipe";

const hasApiConfigured = Boolean(import.meta.env.VITE_RECIPE_API_URL?.trim());

export const PantryRecipeGenerator = () => {
  const [input, setInput] = useState("spinach, chickpeas, rice, tomatoes");
  const [recipe, setRecipe] = useState<PantryRecipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deferredInput = useDeferredValue(input);
  const pantryPreview = parsePantryIngredients(deferredInput);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const nextRecipe = await generatePantryRecipe(input);
      startTransition(() => {
        setRecipe(nextRecipe);
      });
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "Could not create a recipe right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="card-soft overflow-hidden"
      >
        <div className="border-b border-border bg-secondary/40 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <WandSparkles size={18} />
                </span>
                <div>
                  <h2 className="font-display text-lg font-extrabold text-foreground">AI pantry recipe</h2>
                  <p className="text-sm text-muted-foreground">
                    Tell the app what you already have, and it builds a recipe to save food.
                  </p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="shrink-0">
              {hasApiConfigured ? "API mode" : "Local AI mode"}
            </Badge>
          </div>
        </div>

        <div className="p-5">
          <label className="section-label mb-3 block">What is at home?</label>
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Try: tomatoes, half an onion, rice, spinach, yogurt"
            className="min-h-[110px] resize-none rounded-2xl"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {pantryPreview.slice(0, 6).map((item) => (
              <Badge key={item} variant="outline" className="rounded-full bg-background">
                {item}
              </Badge>
            ))}
            {pantryPreview.length === 0 && (
              <span className="text-xs text-muted-foreground">
                Add ingredients separated by commas or new lines.
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Uses your current pantry first. If `VITE_RECIPE_API_URL` is configured, this panel can call your backend instead of the local generator.
            </p>
            <Button
              type="button"
              size="lg"
              className="shrink-0 rounded-xl"
              onClick={handleGenerate}
              disabled={isLoading || pantryPreview.length === 0}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              Generate
            </Button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          {recipe && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-[24px] border border-border bg-background p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ChefHat size={16} className="text-primary" />
                    <span className="section-label">Generated recipe</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-extrabold text-foreground">{recipe.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{recipe.summary}</p>
                </div>
                <Badge className="shrink-0 rounded-full bg-eco-good/10 text-eco-good hover:bg-eco-good/10">
                  {recipe.co2Kg} kg CO₂
                </Badge>
              </div>

              <div className="mt-4">
                <p className="section-label mb-2 block">Use first</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredientsUsed.map((item) => (
                    <Badge key={item} variant="secondary" className="rounded-full">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="section-label mb-2 block">Steps</p>
                <div className="space-y-2">
                  {recipe.steps.map((step, index) => (
                    <div key={step} className="flex gap-3 rounded-2xl bg-secondary/60 p-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-secondary/60 p-4">
                  <p className="section-label mb-2 block">Food-saving tip</p>
                  <p className="text-sm leading-relaxed text-foreground">{recipe.wasteTip}</p>
                </div>
                <div className="rounded-2xl bg-secondary/60 p-4">
                  <p className="section-label mb-2 block">Leftover plan</p>
                  <p className="text-sm leading-relaxed text-foreground">{recipe.leftoverPlan}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
