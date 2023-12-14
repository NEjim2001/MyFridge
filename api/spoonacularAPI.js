import axios from "axios";
import { APIKEY } from "../constants";

const spoonacularURLRecipes = "https://api.spoonacular.com/recipes";
const spoonacularURLFood = "https://api.spoonacular.com/food";

const NUMBER_OF_RECIPES = 7;

export const fetchBulkRecipeInfoByID = async (recipeIds) => {
  try {
    let resp = await axios.get(spoonacularURLRecipes + "/informationBulk", {
      params: {
        apiKey: APIKEY,
        includeNutrition: true,
        ids: recipeIds,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = resp.data;

    return data;
  } catch (e) {
    console.log("Error: ", e);
    return { success: false, msg: e.message };
  }
};

export const fetchIngredientsByName = async (name) => {
  try {
    let resp = await axios.get(spoonacularURLFood + "/ingredients/search", {
      params: {
        apiKey: APIKEY,
        metaInformation: true,
        query: name,
        number: 10,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = resp.data;
    return data;
  } catch (e) {
    console.log("Error: ", e);
    return { success: false, msg: e.message };
  }
};

export const fetchIngredientsById = async (name) => {
  try {
    let resp = await axios.get(spoonacularURLRecipes + "/search", {
      params: {
        apiKey: APIKEY,
        metaInformation: true,
        query: name,
        number: NUMBER_OF_RECIPES,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = resp.data;
    return data;
  } catch (e) {
    console.log("Error: ", e);
    return { success: false, msg: e.message };
  }
};

export const fetchRandomRecipes = async () => {
  try {
    let resp = await axios.get(spoonacularURLRecipes + "/random", {
      params: {
        apiKey: APIKEY,
        limitLicense: true,
        number: NUMBER_OF_RECIPES,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = resp.data;
    return data;
  } catch (e) {
    console.log("Error: ", e);
    return { success: false, msg: e.message };
  }
};
