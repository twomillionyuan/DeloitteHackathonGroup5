from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import requests
from fastapi import HTTPException, Query
import random

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
mockdata = [
        {
            "id": "1095753",
            "name": "Roasted Cauliflower Detox Bowl with Tahini Sauce",
            "desc": "Roasted Cauliflower Detox Bowl with Tahini Sauce might be just the main course you are searching for...",
            "co2": 0.5,
            "time": "50 min",
            "servings": "2 servings",
            "tags": ["Vegan"],
            "emoji": "🥗",
            "mealType": "lunch",
            "highlight": "Try this recipe today!",
            "ingredients": ["kale leaves", "garlic", "quinoa", "cabbage", "avocado", "a cauliflower", "olive oil", "ground cumin", "garden cress", "garlic roasted", "cashews soaked overnight in water", "tahini", "water", "kosher salt"],
            "steps": ["Soak the cashews overnight in water. Preheat the oven to 200C/~395 F. Chop the cauliflower into florets and toss with the olive oil and ground cumin. Roast for 20-25 minutes until golden.", "Add salt to taste. Boil the quinoa in a saucepan for 10 minutes then drain and set aside.", "Add in the quinoa and toss so everything is mixed together.", "Place some of the kale mixture in the bottom of a bowl and top with sliced avocado and a drizzle of tahini sauce."],
            "calories": 524,
            "protein": "16g",
            "carbs": "60g",
            "fat": "29g"
        },
        {
            "id": "982371",
            "name": "Grilled Chicken and Rice Bowl",
            "desc": "A hearty grilled chicken bowl with rice and vegetables, perfect for a protein-packed lunch or dinner...",
            "co2": 1.2,
            "time": "30 min",
            "servings": "2 servings",
            "tags": ["Non-Vegan"],
            "emoji": "🍗",
            "mealType": "lunch",
            "highlight": "Try this recipe today!",
            "ingredients": ["chicken breast", "brown rice", "broccoli", "cherry tomatoes", "olive oil", "garlic", "salt and pepper", "lemon juice"],
            "steps": ["Season the chicken breast with salt, pepper, and garlic. Grill for 6-7 minutes each side until cooked through.", "Cook the brown rice according to package instructions.", "Steam the broccoli until tender, about 5 minutes.", "Slice the chicken and serve over rice with broccoli and cherry tomatoes. Drizzle with lemon juice."],
            "calories": 480,
            "protein": "42g",
            "carbs": "45g",
            "fat": "12g"
        }
    ]

# Allow CORS for the frontend (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecipeRequest(BaseModel):
    ingredients: List[str]
    pantryStaples: List[str] = []
    goal: str = "reduce-food-waste"
    servings: int = 2

class RecipeResponse(BaseModel):
    title: str
    summary: str
    ingredientsUsed: List[str]
    steps: List[str]
    wasteTip: str
    leftoverPlan: str
    co2Kg: float

SPOONACULAR_API_KEY = "06aaf30bf35f4c3eb0d630a87e37a0a5"
SPOONACULAR_URL = "https://api.spoonacular.com/recipes/complexSearch"
API_KEY = "06aaf30bf35f4c3eb0d630a87e37a0a5"
BASE = "https://api.spoonacular.com"

def get_recipe_info(recipe_id):
    """Fetch full details including ingredients + instructions"""
    url = f"{BASE}/recipes/{recipe_id}/information"
    params = {
        "apiKey": API_KEY,
        "includeNutrition": True  
    }
    return requests.get(url, params=params).json()
def map_recipe(item):
    ingredients = [ing["name"] for ing in item.get("extendedIngredients", [])]
    
    steps = []
    if item.get("analyzedInstructions"):
        for instr in item["analyzedInstructions"]:
            for step in instr.get("steps", []):
                steps.append(step.get("step", ""))
    elif item.get("instructions"):
        steps = [s.strip() for s in item["instructions"].split(". ") if s.strip()]

    nutrients = {n["name"]: n for n in item.get("nutrition", {}).get("nutrients", [])}

    return {
        "id": str(item["id"]),
        "name": item.get("title", "Unknown"),
        "desc": item.get("summary", "")[:100] + "...",
        "co2": 0.5,
        "time": f"{item.get('readyInMinutes', 30)} min",
        "servings": f"{item.get('servings', 1)} servings",
        "tags": ["Vegan"] if item.get("vegan") else ["Vegetarian"] if item.get("vegetarian") else ["Non-Vegan"],
        "emoji": "🥗" if item.get("vegan") or item.get("vegetarian") else "🍗",
        "mealType": (item.get("dishTypes") or ["Dinner"])[0],
        "highlight": "Try this recipe today!",
        "ingredients": ingredients,
        "steps": steps,
        "calories": round(nutrients.get("Calories", {}).get("amount", 0)),
        "protein": f'{round(nutrients.get("Protein", {}).get("amount", 0))}g',
        "carbs": f'{round(nutrients.get("Carbohydrates", {}).get("amount", 0))}g',
        "fat": f'{round(nutrients.get("Fat", {}).get("amount", 0))}g',
    }
@app.get("/daily-recipe")
def daily_recipe(target_calories: int = 500):
    return mockdata
    margin = 150

    vegan_search = requests.get(f"{BASE}/recipes/complexSearch", params={
        "diet": "vegetarian",
        "number": 5,  # fetch a few so we can pick the closest calorie match
        "offset": random.randint(0, 50),
        "apiKey": API_KEY,
    }).json()

    meat = random.choice(["chicken", "beef", "pork", "lamb", "turkey", "salmon"])

    non_vegan_search = requests.get(f"{BASE}/recipes/complexSearch", params={
        "number": 10,
        "offset": random.randint(0, 100),
        "includeIngredients": meat,
        "apiKey": API_KEY,
    }).json()

    if not vegan_search["results"] or not non_vegan_search["results"]:
        raise HTTPException(status_code=404, detail="No recipes found")

    # fetch full info for all candidates and pick closest to target calories
    def best_match(results):
        infos = [get_recipe_info(r["id"]) for r in results]
        def cal(item):
            nutrients = {n["name"]: n for n in item.get("nutrition", {}).get("nutrients", [])}
            return nutrients.get("Calories", {}).get("amount", 0)
        return min(infos, key=lambda x: abs(cal(x) - target_calories))

    
    return [map_recipe(best_match(vegan_search["results"])), 
            map_recipe(best_match(non_vegan_search["results"]))]


@app.get("/")
async def root():
    return {"message": "FastAPI backend is running"}