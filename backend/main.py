from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

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

@app.post("/generate-recipe", response_model=RecipeResponse)
async def generate_recipe(request: RecipeRequest):
    # Simple mock logic - in a real app, integrate with AI or database
    ingredients = request.ingredients
    if not ingredients:
        raise ValueError("No ingredients provided")

    title = f"Recipe with {', '.join(ingredients[:3])}"
    summary = f"A delicious dish using {', '.join(ingredients)} to reduce waste."
    ingredientsUsed = ingredients[:5]  # Use first 5
    steps = [
        "Prep your ingredients.",
        "Cook them together.",
        "Serve and enjoy!"
    ]
    wasteTip = "Use leftovers for tomorrow's meal."
    leftoverPlan = "Store in fridge for up to 2 days."
    co2Kg = 0.5  # Mock value

    return RecipeResponse(
        title=title,
        summary=summary,
        ingredientsUsed=ingredientsUsed,
        steps=steps,
        wasteTip=wasteTip,
        leftoverPlan=leftoverPlan,
        co2Kg=co2Kg
    )

@app.get("/")
async def root():
    return {"message": "FastAPI backend is running"}