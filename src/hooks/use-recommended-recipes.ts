import { useEffect, useMemo, useState } from "react";
import { recipes, type Recipe } from "../data/recipes";

const RECOMMENDED_RECIPE_OFFSET_KEYS = [
  "recommended-recipe-offset-0",
  "recommended-recipe-offset-1",
] as const;
const RECOMMENDED_RECIPE_URL = "http://localhost:8000/daily-recipe?target_calories=500";

type RemoteRecipe = Partial<Recipe> & {
  co2Kg?: number;
  carbonEstimateKg?: number;
};

const isVegetarianRecipe = (recipe: { tags?: string[] }) =>
  recipe.tags?.some((tag) => ["Vegan", "Veggie", "Vegetarian"].includes(tag)) ?? false;

const readStoredOffsets = () => {
  if (typeof window === "undefined") {
    return [0, 0];
  }

  return RECOMMENDED_RECIPE_OFFSET_KEYS.map((key) => {
    const stored = Number(window.localStorage.getItem(key) ?? 0);
    return Number.isFinite(stored) ? stored : 0;
  });
};

const persistOffsets = (offsets: number[]) => {
  if (typeof window === "undefined") {
    return;
  }

  RECOMMENDED_RECIPE_OFFSET_KEYS.forEach((key, index) => {
    window.localStorage.setItem(key, String(offsets[index] ?? 0));
  });
};

const getDaySeed = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
};

export const useRecommendedRecipes = () => {
  const [offsets, setOffsets] = useState(readStoredOffsets);
  const [remoteRecipes, setRemoteRecipes] = useState<RemoteRecipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!RECOMMENDED_RECIPE_URL) {
      return;
    }

    let cancelled = false;

    fetch(RECOMMENDED_RECIPE_URL)
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length >= 2) {
          setRemoteRecipes(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRemoteRecipes(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const fallbackVegetarianRecipes = useMemo(
    () => recipes.filter((recipe) => isVegetarianRecipe(recipe)),
    [],
  );
  const fallbackMeatRecipes = useMemo(
    () => recipes.filter((recipe) => !isVegetarianRecipe(recipe)),
    [],
  );

  const remoteVegetarianRecipes = useMemo(
    () => (remoteRecipes ?? []).filter((recipe) => isVegetarianRecipe(recipe)),
    [remoteRecipes],
  );
  const remoteMeatRecipes = useMemo(
    () => (remoteRecipes ?? []).filter((recipe) => !isVegetarianRecipe(recipe)),
    [remoteRecipes],
  );

  const vegetarianPool =
    remoteVegetarianRecipes.length > 1 ? remoteVegetarianRecipes : fallbackVegetarianRecipes;
  const meatPool =
    remoteMeatRecipes.length > 1
      ? remoteMeatRecipes
      : fallbackMeatRecipes.length > 0
        ? fallbackMeatRecipes
        : fallbackVegetarianRecipes;

  const recommendedRecipes = useMemo(() => {
    const seed = getDaySeed(new Date());

    return [
      vegetarianPool[(seed + offsets[0]) % vegetarianPool.length],
      meatPool[(seed * 3 + offsets[1]) % meatPool.length],
    ];
  }, [meatPool, offsets, vegetarianPool]);

  const refreshRecipe = (index: number) => {
    setOffsets((current) => {
      const next = [...current];
      next[index] = (next[index] ?? 0) + 1;
      persistOffsets(next);
      return next;
    });
  };

  return {
    recommendedRecipes,
    isLoading,
    refreshRecipe,
  };
};
