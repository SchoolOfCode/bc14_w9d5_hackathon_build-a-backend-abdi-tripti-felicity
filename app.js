import express from "express";

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

app.get("/api/recipes", async (req,res) => {
  let allRecipes = await getRecipes()
  res.json(allRecipes)
  console.log(allRecipes)
})

app.get("/api/recipes/:id", async (req,res) => {
let recipeID = req.params.id
let recipe = await getRecipeByID(recipeID)
res.json(recipe)
})

app.post("/api/recipes", async (req,res) =>{
 let addedRecipe = await createRecipe() 
 res.json(addedRecipe)
 console.log(req.body)
})

  app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
