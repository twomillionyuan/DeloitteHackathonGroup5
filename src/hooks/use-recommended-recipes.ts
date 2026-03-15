import { useEffect, useMemo, useState } from "react";
import { getDailyRecipeSuggestionsWithOffset, type Recipe } from "../data/recipes";

const RECOMMENDED_RECIPE_OFFSET_KEY = "recommended-recipe-offset";
const RECOMMENDED_RECIPE_URL = "http://localhost:8000/daily-recipe?target_calories=500";

type RemoteRecipe = Partial<Recipe> & {
  co2Kg?: number;
  carbonEstimateKg?: number;
};

const readStoredOffset = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  const stored = Number(window.localStorage.getItem(RECOMMENDED_RECIPE_OFFSET_KEY) ?? 0);
  return Number.isFinite(stored) ? stored : 0;
};

export const useRecommendedRecipes = () => {
  const [offset, setOffset] = useState(readStoredOffset);
  const [remoteRecipes, setRemoteRecipes] = useState<RemoteRecipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
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
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const fallbackSuggestions = useMemo(() => getDailyRecipeSuggestionsWithOffset(offset), [offset]);

  const recommendedRecipes = useMemo(() => {
    if (remoteRecipes && remoteRecipes.length >= 2) {
      const length = remoteRecipes.length;
      return [
        remoteRecipes[offset % length],
        remoteRecipes[(offset + 1) % length],
      ];
    }

    return [fallbackSuggestions.lunch, fallbackSuggestions.dinner];
  }, [fallbackSuggestions.dinner, fallbackSuggestions.lunch, offset, remoteRecipes]);

  const generateOtherRecipes = () => {
    setOffset((current) => {
      const next = current + 1;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(RECOMMENDED_RECIPE_OFFSET_KEY, String(next));
      }
      return next;
    });
  };

  return {
    recommendedRecipes,
    isLoading,
    generateOtherRecipes,
  };
};
