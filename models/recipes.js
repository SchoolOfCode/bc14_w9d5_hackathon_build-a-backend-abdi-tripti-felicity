import recipes from "../libs/recipes.js";

// GET ALL RECIPES
export function getRecipes() {
  // return all the recipes
  return recipes;
}

export function searchRecipesByTitle(search) {
  return recipes.filter(function (item) {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });
}

// GET A RECIPE BY ID
export function getRecipeByID(id) {
  // take in an id - done
  // find the recipe with that id - done
  const found = recipes.find(function (recipe) {
    return recipe.id === id;
  });
  // return that recipe
  return found;
}

// CREATE A RECIPE
export function createRecipe(recipe) {
  // take in a recipe - done
  // add it to the collection
  recipes.push(recipe);
  // return the new recipe
  return recipes[recipes.length - 1];
}

// UPDATE A RECIPE BY ID
export function updateRecipeByID(id, updates) {
  // take in the id, take in an updated recipe - done
  // find the position of recipe with the id matching what we were given
  const foundIndex = recipes.findIndex(function (recipe) {
    return recipe.id === id;
  });
  // replace that recipe with the updates
  recipes[foundIndex] = updates;
  // return the new recipe
  return recipes[foundIndex];
}

// DELETE A RECIPE BY ID
export function deleteRecipeByID(id) {
  // take in an id
  // find the item with that id
  const foundIndex = recipes.findIndex(function (recipe) {
    return recipe.id === id;
  });
  const item = recipes[foundIndex];
  // remove it from the array
  recipes.splice(foundIndex, 1);
  // return that removed item
  return item;
}
