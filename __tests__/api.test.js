import request from 'supertest';
import app from '../app.js';
import recipes from '../libs/recipes.js';

describe('The API', () => {
  it('GET /recipies will return all recipes', async () => {
    const actual = await request(app).get('/recipes');

    expect(actual.body).toStrictEqual(
      {
        success: true,
        payload: recipes
      }
    );
  });

  it('GET /recipies/<recipe_id> returns recipie with a particular id if it exists', async () => {
    const id = 1;
    const actual = await request(app).get(`/recipes/${id}`);
    const recipe = recipes.find(recipe => recipe.id === id);

    expect(actual.body).toStrictEqual(
      {
        success: true,
        payload: recipe,
      }
    );
  });

  it('GET /recipies/<recipe_id> returns false if one does not exist', async () => {
    const id = 0;
    const actual = await request(app).get(`/recipes/${id}`);
  
    expect(actual.body).toStrictEqual(
      {
        success: false,
      }
    );
  });

  it('POST /recipies will create a new recipe and return it', async () => {
    const newRecipe = {
      title: "Cheese on Toast",
      ingredients: ["50g of cheese", "10g of butter", "150g of toast"],
      instructions: `Put the butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the cheese, slowly.
    
      Season to taste.`,
      image:
        "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg",
    };

    const actual = await request(app).post('/recipes').send(newRecipe);
    newRecipe.id = 2;

    expect(actual.body).toStrictEqual({
      success: true,
      payload: newRecipe,
    });
  });

  it('PUT /recipies/<recipie_id> will update a recipe and return it if found', async () => {
    const id = 2;
    const newRecipe = {
      title: "Cheese on Toast",
      ingredients: ["50g of cheese", "10g of butter", "150g of toast"],
      instructions: `Put the butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the cheese, slowly.
    
      Season to taste.`,
      image:
        "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg",
    };

    const actual = await request(app).put(`/recipes/${id}`).send(newRecipe);
    newRecipe.id = id;
    const expected = {
      success: true,
      payload: newRecipe,
    };

    expect(actual.body).toStrictEqual(expected);
  });

  it('PUT /recipies/<recipie_id> will return false if not found', async () => {
    const newRecipe = {
      title: "Cheese on Toast",
      ingredients: ["50g of cheese", "10g of butter", "150g of toast"],
      instructions: `Put the butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the cheese, slowly.
    
      Season to taste.`,
      image:
        "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg",
    };

    const actual = await request(app).put('/recipes/0').send(newRecipe);
    const expected = {success: false};

    expect(actual.body).toStrictEqual(expected);
  });

  it('DELETE /recipies/<recipie_id> will delete the recipie and return it', async () => {
    const id = 1;
    const recipe = recipes.find(recipe => recipe.id === id);
    const expected = {
      success: true,
      payload: recipe,
    };
    
    const actual = await request(app).delete(`/recipes/${id}`);
    
    expect(actual.body).toStrictEqual(expected);
  });

  it('DELETE /recipies/<recipie_id> will return false if not exists', async () => {
    const id = 0;
    const actual = await request(app).delete(`/recipes/${id}`);
  
    expect(actual.body).toStrictEqual(
      {
        success: false,
      }
    );
  });
});
