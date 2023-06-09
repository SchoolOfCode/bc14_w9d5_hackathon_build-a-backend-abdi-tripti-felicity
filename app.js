import express, { response } from "express";
import morgan from "morgan";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 3000;
let allRecipes = await getRecipes()

app.use(express.static("public"));
app.use(express.json());

async function responseObject(success, payload){
  return {
    success: success,
    payload: payload
  }
}

//Use morgan middleware to log requests
//Get all recipes
app.get("/api/recipes", morgan("tiny"), async (req,res) => {
  let allRecipes = await getRecipes()
  res.json(await responseObject(true, allRecipes))
  console.log(allRecipes)
})

//Get a recipe by ID if it exists
app.get("/api/recipes/:id", async (req,res) => {
let recipeID = req.params.id
let recipe = await getRecipeByID(recipeID)
res.json(await responseObject(true, recipe))
})
//Create a new recipe
app.post("/api/recipes", async (req,res) =>{
 let addedRecipe = await createRecipe(req.body) 
 res.json(await responseObject(true, addedRecipe))
 console.log(req.body)
})

//Use PATCH to update a recipe by ID
app.patch("/api/recipes/:id", async (req,res) => {
 let id = req.params.id
 let updatedRecipe = await updateRecipeByID(id, req.body)
 res.json(await responseObject(true, updatedRecipe))
})


//DELETE 
// use id 4c848d48-b81e-4d6f-b45d-7b3090f4f8eu
app.delete("/api/recipes/:id", async (req, res) => {
  let id = req.params.id
  let deletedRecipe = await deleteRecipeByID(id)
  res.json(await responseObject(true, deletedRecipe))
})

  app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
