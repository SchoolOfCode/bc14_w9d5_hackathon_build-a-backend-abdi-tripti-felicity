import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";
let newRecipe = {
    "id": "4c848d48-b81e-4d6f-b45d-7b3090f4f8eu",
    "title": "Kellogs Cornflakes",
    "ingredients": ["50g of cornflakes", "100ml of milk"],
    "instructions": "Put the cornflakes in a bowl, add the milk. Eat with a spoon.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Kellogg%27s_Corn_Flakes%2C_with_milk.jpg"
  }
// GET ALL RECIPES
export async function getRecipes() {
    let Data = await fs.readFile(fileName, "utf8");
    let recipes = JSON.parse(Data);
    return recipes;

}

// GET A RECIPE BY ID
export async function getRecipeByID(id) {
    let recipes = await getRecipes();
    let recipe = recipes.find((recipe) => recipe.id === id);
    return recipe;
}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {
    let recipes = await getRecipes();
    recipes.push(newRecipe)
    await fs.writeFile(fileName, JSON.stringify(recipes))
    return newRecipe;
}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {}
