import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID
} from '../models/recipes.js';

import recipes from '../libs/recipes.js';

describe('recipes Model', () => {
  it('getRecipes should return an array of all recipes', () => {
    const actual = getRecipes();

    expect(actual).toStrictEqual(recipes);
  });
  
  it('getRecipieByID should return the particular recipe we are looking for', () => {
    const id = 1;
    const actual = getRecipeByID(id);
    const expected = recipes.find(recipie => recipie.id === id);

    expect(actual).toStrictEqual(expected);
  });

  it('getRecipeByID should return null if the particular recipe we are looking for does not exist', () => {
    const id = 0;
    const actual = getRecipeByID(id);

    expect(actual).toEqual(null);
  });

  it('createRecipe should add a recipe to the collection and return the new recipe', () => {
    const newRecipe = {
      title: "Cheese on Toast",
      ingredients: ["50g of cheese", "10g of butter", "150g of toast"],
      instructions: `Put the butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the cheese, slowly.
    
      Season to taste.`,
      image:
        "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg",
    };

    const expected = {...newRecipe};
    expected.id = recipes.length + 1;

    const actual = createRecipe(newRecipe);

    expect(actual).toStrictEqual(expected);
  });

  it('updateRecipeByID should replace the recipe at a certain ID with an updated version and return the new recipe', () => {
    const id = recipes.length;
    const updatedRecipe = {
      title: "Cheesy Beans on Toast",
      ingredients: ["50g of cheese", "150g of beans", "10g of butter", "150g of toast"],
      instructions: `Put the butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the cheese and beans, slowly.
    
      Season to taste.`,
      image:
        "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg",
    };
    const actual = updateRecipeByID(id, updatedRecipe);
    const expected = {...updatedRecipe};
    expected.id = id;

    expect(actual).toEqual(expected);
  });

  it('updateRecipeByID should return null if the recipe is not found', () => {
    const id = 0;
    const updatedRecipe = {
      title: "Cheese on Toast",
      ingredients: ["50g of cheese", "10g of butter", "150g of toast"],
      instructions: `Put the butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the cheese, slowly.
    
      Season to taste.`,
      image:
        "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg",
    };
    const actual = updateRecipeByID(id, updatedRecipe);

    expect(actual).toEqual(null);
  });

  it('deleteRecipeByID should remove the specific recipe from the collection, and return the deleted recipe', () => {
    const id = recipes.length;
    const expected = recipes.find(recipie => recipie.id === id);
    const actual = deleteRecipeByID(id);

    expect(actual).toBe(expected);
  });

  it('deleteRecipeByID should return null if the recipe is not found', () => {
    const id = 0;
    const actual = deleteRecipeByID(id);

    expect(actual).toEqual(null);
  });
});
