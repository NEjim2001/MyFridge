import axios from "axios";
import { SPOONCULAR_API_KEY } from "@env";

const APIKEY = SPOONCULAR_API_KEY;

const spoonacularURLRecipes = "https://api.spoonacular.com/recipes";
const spoonacularURLFood = "https://api.spoonacular.com/food";

const NUMBER_OF_RECIPES = 10;

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

export const fetchRecipesByIngredients = async (ingredients) => {
  try {
    let resp = await axios.get(spoonacularURLRecipes + "/findByIngredients", {
      params: {
        apiKey: APIKEY,
        ingredients: ingredients,
        number: 10,
        limitLicense: true,
        ranking: 1,
        ignorePantry: true,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = resp.data;
    cl;
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
