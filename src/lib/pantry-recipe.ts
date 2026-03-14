export interface PantryRecipe {
  title: string;
  summary: string;
  ingredientsUsed: string[];
  steps: string[];
  wasteTip: string;
  leftoverPlan: string;
  co2Kg: number;
  source: "api" | "local";
}

const STAPLES = ["olive oil", "salt", "pepper", "garlic", "onion"];

const parsePantryIngredients = (input: string) =>
  input
    .split(/[\n,;]+/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

const titleCase = (value: string) =>
  value.replace(/\b\w/g, (match) => match.toUpperCase());

const pickTitle = (ingredients: string[]) => {
  if (ingredients.some((item) => /(rice|quinoa|couscous)/.test(item))) {
    return "Clean-Out-the-Fridge Grain Bowl";
  }
  if (ingredients.some((item) => /(pasta|spaghetti|penne|noodles)/.test(item))) {
    return "Pantry Rescue Pasta";
  }
  if (ingredients.some((item) => /(bread|toast|bagel)/.test(item))) {
    return "Crisp Pantry Toast Stack";
  }
  if (ingredients.some((item) => /(tortilla|wrap|pita)/.test(item))) {
    return "Leftover Saver Wraps";
  }

  return "Flexible Zero-Waste Skillet";
};

const buildLocalRecipe = async (ingredients: string[]): Promise<PantryRecipe> => {
  const ingredientsUsed = ingredients.slice(0, 5);
  const hero = ingredientsUsed[0] ?? "vegetables";
  const backup = ingredientsUsed[1] ?? "beans";
  const accent = ingredientsUsed[2] ?? "herbs";
  const co2Kg = Number(Math.min(0.9, 0.18 + ingredientsUsed.length * 0.09).toFixed(1));

  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    title: pickTitle(ingredientsUsed),
    summary: `Turn ${hero}, ${backup}, and ${accent} into a quick dinner before they get forgotten in the fridge.`,
    ingredientsUsed,
    steps: [
      `Chop the ${hero} and ${backup}. Start by sauteing them in olive oil with garlic and onion until softened.`,
      `Add ${ingredientsUsed.slice(2).join(", ") || accent} plus any grains, beans, or sauce you already have, then cook until everything is hot and well combined.`,
      "Finish with salt, pepper, lemon, yogurt, or herbs depending on what needs using first, and serve immediately.",
    ],
    wasteTip: `Use the softest ingredient first and freeze any extra portion tonight so it does not become tomorrow's food waste.`,
    leftoverPlan: "Make two portions and pack the extra for lunch, or fold leftovers into a wrap, omelet, or toast topping tomorrow.",
    co2Kg,
    source: "local",
  };
};

const toArray = (value: unknown) => (Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : []);

const normalizeApiRecipe = (payload: Record<string, unknown>, fallbackIngredients: string[]): PantryRecipe => {
  const ingredientsUsed = toArray(payload.ingredientsUsed ?? payload.ingredients ?? payload.useFirst);
  const steps = toArray(payload.steps ?? payload.instructions);

  return {
    title: typeof payload.title === "string" ? payload.title : typeof payload.name === "string" ? payload.name : pickTitle(fallbackIngredients),
    summary:
      typeof payload.summary === "string"
        ? payload.summary
        : typeof payload.description === "string"
          ? payload.description
          : `A waste-saving recipe built around ${fallbackIngredients.slice(0, 3).join(", ")}.`,
    ingredientsUsed: ingredientsUsed.length > 0 ? ingredientsUsed : fallbackIngredients.slice(0, 5),
    steps:
      steps.length > 0
        ? steps
        : [
            "Prep your most perishable ingredients first.",
            "Cook everything together with pantry staples and seasoning.",
            "Serve immediately and store the extra portion for tomorrow.",
          ],
    wasteTip:
      typeof payload.wasteTip === "string"
        ? payload.wasteTip
        : "Use the ingredients closest to expiry first to cut food waste.",
    leftoverPlan:
      typeof payload.leftoverPlan === "string"
        ? payload.leftoverPlan
        : "Save any extra serving for lunch tomorrow.",
    co2Kg:
      typeof payload.co2Kg === "number"
        ? payload.co2Kg
        : typeof payload.carbonEstimateKg === "number"
          ? payload.carbonEstimateKg
          : Number(Math.min(0.9, 0.18 + fallbackIngredients.length * 0.09).toFixed(1)),
    source: "api",
  };
};

export const generatePantryRecipe = async (input: string): Promise<PantryRecipe> => {
  const ingredients = parsePantryIngredients(input);

  if (ingredients.length === 0) {
    throw new Error("Add at least one ingredient to generate a recipe.");
  }

  const apiUrl = import.meta.env.VITE_RECIPE_API_URL?.trim();
  const apiKey = import.meta.env.VITE_RECIPE_API_KEY?.trim();

  if (!apiUrl) {
    return buildLocalRecipe(ingredients);
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        ingredients,
        pantryStaples: STAPLES,
        goal: "reduce-food-waste",
        servings: 2,
      }),
    });

    if (!response.ok) {
      throw new Error(`Recipe API returned ${response.status}`);
    }

    const payload = (await response.json()) as Record<string, unknown>;
    return normalizeApiRecipe(payload, ingredients);
  } catch {
    return buildLocalRecipe(ingredients);
  }
};

export { parsePantryIngredients };
