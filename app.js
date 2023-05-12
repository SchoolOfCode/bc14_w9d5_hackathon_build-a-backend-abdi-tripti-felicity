import express from "express";

import { html } from "./config.js";
import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
  searchRecipesByTitle
} from "./models/recipes.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

/** DO NOT CHANGE THIS ROUTE - it serves our front-end */
app.get("/", function (req, res) {
  res.sendFile(html);
});

/** YOUR ROUTES GO HERE */

app.get("/recipes", function (req, res) {
  // if there way a title query parameter included
  if (req.query.title !== undefined) {
    // search by title
    const result = searchRecipesByTitle(req.query.title);
    // respond with { success: Boolean, payload: recipe array }
    return res.json({ success: true, payload: result });
  }

  // get all of the recipes - done
  const result = getRecipes();
  // respond with { success: Boolean, payload: recipe array }
  res.json({ success: true, payload: result });
});

app.get("/recipes/:id", function (req, res) {
  // get the id out of the url
  // make sure the id is a number
  const id = Number(req.params.id);
  // get a recipe with that id
  const recipe = getRecipeByID(id);
  // respond with { success: Boolean, payload: recipe }
  res.json({ success: true, payload: recipe });
});

app.post("/recipes", function (req, res) {
  // get the new recipe from the body
  const newRecipe = req.body;
  // add the new recipe to the recipes
  const result = createRecipe(newRecipe);
  // respond with { success: Boolean, payload: recipe }
  res.json({ success: true, payload: result });
});

app.put("/recipes/:id", function (req, res) {
  // save the id in the url
  // id should be a number
  const id = Number(req.params.id);
  // take the body from the request
  const data = req.body;
  // replace the recipe with id with the body
  const result = updateRecipeByID(id, data);
  // respond with { success: Boolean, payload: recipe }
  res.json({ success: true, payload: result });
});

app.delete("/recipes/:id", function (req, res) {
  // get the id from the url
  // convert id to number
  const id = Number(req.params.id);
  // delete the recipe with that id
  const result = deleteRecipeByID(id);
  // respond with { success: Boolean, payload: recipe }
  res.json({ success: true, payload: result });
});

/** END OF YOUR ROUTES */

app.listen(PORT, () => {
  console.log(`Listening now on port ${PORT}`);
});
``;
