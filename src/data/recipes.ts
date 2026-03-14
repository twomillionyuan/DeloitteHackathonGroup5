export interface Recipe {
  id: string;
  name: string;
  desc: string;
  co2: number;
  time: string;
  servings: string;
  tags: string[];
  emoji: string;
  mealType: "Lunch" | "Dinner";
  highlight: string;
  ingredients: string[];
  steps: string[];
}

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Chickpea Curry Bowl",
    desc: "Creamy coconut curry with spinach and rice",
    co2: 0.4,
    time: "25 min",
    servings: "2 servings",
    tags: ["Vegan", "High Protein"],
    emoji: "🍛",
    mealType: "Dinner",
    highlight: "Batch-cooks well for tomorrow's lunch.",
    ingredients: ["chickpeas", "spinach", "coconut milk", "rice", "curry paste", "lime"],
    steps: [
      "Cook the rice while you saute curry paste with garlic in a splash of oil.",
      "Stir in chickpeas and coconut milk, then simmer until the sauce thickens.",
      "Fold in spinach at the end and serve over rice with lime.",
    ],
  },
  {
    id: "2",
    name: "Mushroom Risotto",
    desc: "Creamy arborio rice with mixed mushrooms",
    co2: 0.5,
    time: "35 min",
    servings: "2 servings",
    tags: ["Veggie", "Comfort"],
    emoji: "🍄",
    mealType: "Dinner",
    highlight: "Rich and filling without the footprint of meat.",
    ingredients: ["arborio rice", "mushrooms", "vegetable stock", "parmesan", "onion", "parsley"],
    steps: [
      "Saute onion and mushrooms until deeply golden.",
      "Add arborio rice and ladle in stock gradually, stirring until creamy.",
      "Finish with parmesan and parsley before serving.",
    ],
  },
  {
    id: "3",
    name: "Lentil Bolognese",
    desc: "Rich tomato sauce with red lentils and herbs",
    co2: 0.3,
    time: "30 min",
    servings: "3 servings",
    tags: ["Vegan", "Budget"],
    emoji: "🍝",
    mealType: "Dinner",
    highlight: "A low-cost swap for traditional mince sauce.",
    ingredients: ["red lentils", "tomatoes", "spaghetti", "carrot", "celery", "oregano"],
    steps: [
      "Cook the spaghetti and reserve a splash of pasta water.",
      "Simmer lentils with tomatoes, carrot, celery, and oregano until tender.",
      "Toss the sauce with pasta and loosen with pasta water if needed.",
    ],
  },
  {
    id: "4",
    name: "Grilled Halloumi Salad",
    desc: "Mediterranean salad with roasted vegetables",
    co2: 0.7,
    time: "15 min",
    servings: "1 serving",
    tags: ["Veggie", "Quick"],
    emoji: "🥗",
    mealType: "Lunch",
    highlight: "Fast enough for a study break or office lunch.",
    ingredients: ["halloumi", "mixed greens", "roasted peppers", "cucumber", "cherry tomatoes", "olive oil"],
    steps: [
      "Pan-sear slices of halloumi until golden on both sides.",
      "Toss greens, cucumber, peppers, and tomatoes in olive oil and lemon.",
      "Top the salad with warm halloumi and cracked pepper.",
    ],
  },
  {
    id: "5",
    name: "Sweet Potato Tacos",
    desc: "Spiced sweet potato with avocado crema",
    co2: 0.3,
    time: "20 min",
    servings: "2 servings",
    tags: ["Vegan", "Fun"],
    emoji: "🌮",
    mealType: "Lunch",
    highlight: "Big flavor with one of the lowest CO2 scores.",
    ingredients: ["sweet potato", "tortillas", "avocado", "lime", "black beans", "smoked paprika"],
    steps: [
      "Roast or pan-cook spiced sweet potato cubes until tender.",
      "Warm tortillas and fill with black beans and the sweet potato.",
      "Blend avocado with lime into a quick crema and spoon over the tacos.",
    ],
  },
  {
    id: "6",
    name: "Tofu Stir-Fry",
    desc: "Sesame tofu with crunchy vegetables and noodles",
    co2: 0.4,
    time: "20 min",
    servings: "2 servings",
    tags: ["Vegan", "Asian"],
    emoji: "🥘",
    mealType: "Dinner",
    highlight: "Protein-dense and easy to make in one pan.",
    ingredients: ["tofu", "noodles", "broccoli", "carrot", "soy sauce", "sesame oil"],
    steps: [
      "Crisp the tofu in a hot pan until lightly browned.",
      "Cook noodles separately, then stir-fry broccoli and carrot in sesame oil.",
      "Combine everything with soy sauce and a splash of noodle water.",
    ],
  },
  {
    id: "7",
    name: "Herby Bean Toast",
    desc: "White beans on sourdough with lemon and greens",
    co2: 0.2,
    time: "10 min",
    servings: "1 serving",
    tags: ["Vegan", "Fast"],
    emoji: "🍞",
    mealType: "Lunch",
    highlight: "Ten-minute lunch with almost no prep.",
    ingredients: ["white beans", "sourdough", "spinach", "lemon", "chili flakes", "olive oil"],
    steps: [
      "Toast the sourdough while warming beans with olive oil and chili flakes.",
      "Wilt spinach into the beans and brighten with lemon.",
      "Pile everything onto toast and finish with extra black pepper.",
    ],
  },
  {
    id: "8",
    name: "Roasted Veg Couscous",
    desc: "Warm couscous bowl with chickpeas and herbs",
    co2: 0.3,
    time: "18 min",
    servings: "2 servings",
    tags: ["Vegan", "Meal Prep"],
    emoji: "🥙",
    mealType: "Lunch",
    highlight: "Easy to portion for two meals at once.",
    ingredients: ["couscous", "chickpeas", "zucchini", "carrot", "mint", "lemon"],
    steps: [
      "Pour hot stock over couscous and cover until fluffy.",
      "Roast or saute zucchini and carrot, then fold through chickpeas.",
      "Mix vegetables into couscous with mint and lemon before serving.",
    ],
  },
];

export const getCo2Label = (co2: number) => {
  if (co2 <= 0.4) return { text: "Super Low", className: "text-eco-good bg-eco-good/10" };
  if (co2 <= 0.7) return { text: "Low", className: "text-accent bg-accent/10" };
  return { text: "Moderate", className: "text-eco-warn bg-[hsl(var(--eco-warn)/0.1)]" };
};

const getDaySeed = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
};

export const getDailyRecipeSuggestions = (date: Date = new Date()) => {
  const lunchRecipes = recipes.filter((recipe) => recipe.mealType === "Lunch");
  const dinnerRecipes = recipes.filter((recipe) => recipe.mealType === "Dinner");
  const seed = getDaySeed(date);

  return {
    lunch: lunchRecipes[seed % lunchRecipes.length],
    dinner: dinnerRecipes[(seed * 3) % dinnerRecipes.length],
  };
};

export const getRecipeById = (recipeId?: string) => recipes.find((recipe) => recipe.id === recipeId);
