import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

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
    newRecipe.id = uuidv4();
    recipes.push(newRecipe)
    await fs.writeFile(fileName, JSON.stringify(recipes))
    return newRecipe;
}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {
    let recipes = await getRecipes();
    let index = recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) {
        return null;
    } else {
        recipes[index] = updatedRecipe;
        await fs.writeFile(fileName, JSON.stringify(recipes));
        return updatedRecipe;
    }
}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {
    let recipes = await getRecipes();
    let index = recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) {
        return null;
    } else {
        let deletedRecipe = recipes.splice(index, 1)
        await fs.writeFile(fileName, JSON.stringify(recipes));
        return deletedRecipe;
    }
}
