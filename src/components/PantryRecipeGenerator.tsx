import { startTransition, useDeferredValue, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChefHat, Loader2, Sparkles, X } from "lucide-react";
import { generatePantryRecipe, parsePantryIngredients, type PantryRecipe } from "@/lib/pantry-recipe";

const hasApiConfigured = Boolean(import.meta.env.VITE_RECIPE_API_URL?.trim());

export const PantryRecipeGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
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
        className="card-soft"
      >
        {!isOpen ? (
          <div className="flex justify-center">
            <Button
              type="button"
              size="lg"
              className="rounded-full px-6"
              onClick={() => setIsOpen(true)}
            >
              <Sparkles />
              Make something with what you have at home
            </Button>
          </div>
        ) : null}

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 overflow-hidden"
            >
              <div className="paper-panel border-b border-border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="section-label">Pantry match</span>
                    <h2 className="mt-2 font-display text-[1.6rem] leading-none text-foreground">
                      Start with what you have.
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="shrink-0 rounded-full bg-background/80">
                      {hasApiConfigured ? "API" : "Built in"}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Close pantry recipe generator"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="rounded-[24px] border border-border bg-background/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <label className="section-label">What is at home?</label>
                  </div>
                  <Textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Try: tomatoes, half an onion, rice, spinach, yogurt"
                    className="mt-3 min-h-[118px] resize-none rounded-[20px] border-0 bg-secondary/70 px-4 py-3 shadow-none focus-visible:ring-1"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {pantryPreview.slice(0, 6).map((item) => (
                    <Badge key={item} variant="outline" className="rounded-full bg-background">
                      {item}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    type="button"
                    size="lg"
                    className="shrink-0 rounded-full px-5"
                    onClick={handleGenerate}
                    disabled={isLoading || pantryPreview.length === 0}
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                    Draft recipe
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
                    className="mt-5 rounded-[26px] border border-border bg-background/85 p-5"
                  >
                    <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <ChefHat size={16} className="text-primary" />
                          <span className="section-label">Suggested dish</span>
                        </div>
                        <h3 className="mt-2 font-display text-[1.5rem] leading-none text-foreground">{recipe.title}</h3>
                      </div>
                      <Badge className="shrink-0 rounded-full bg-eco-good/10 text-eco-good hover:bg-eco-good/10">
                        {recipe.co2Kg} kg CO₂
                      </Badge>
                    </div>

                    <div className="mt-4">
                      <p className="section-label mb-2 block">Start with these</p>
                      <div className="flex flex-wrap gap-2">
                        {recipe.ingredientsUsed.map((item) => (
                          <Badge key={item} variant="secondary" className="rounded-full">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="section-label mb-2 block">Method</p>
                      <div className="space-y-2">
                        {recipe.steps.map((step, index) => (
                          <div key={step} className="paper-panel flex gap-3 rounded-2xl border border-border p-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                              {index + 1}
                            </span>
                            <p className="text-sm leading-relaxed text-foreground">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="paper-panel rounded-2xl border border-border p-4">
                        <p className="section-label mb-2 block">Waste-saving note</p>
                        <p className="text-sm leading-relaxed text-foreground">{recipe.wasteTip}</p>
                      </div>
                      <div className="paper-panel rounded-2xl border border-border p-4">
                        <p className="section-label mb-2 block">Leftover plan</p>
                        <p className="text-sm leading-relaxed text-foreground">{recipe.leftoverPlan}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
