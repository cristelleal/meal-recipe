import { API_BASE_URL } from "../utils/constants";

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.php`);
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching categories: ${error}`);
  }
};

export const getRecipeById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching recipe by ID: ${error}`);
  }
};

export const getRecipesByCategory = async (category: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching recipes by category: ${error}`);
  }
};

export const getRandomRecipe = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/random.php`);
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching random recipe: ${error}`);
  }
};

export const getIngredients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?i=list`);
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching ingredients: ${error}`);
  }
};

export const getRecipesByIngredient = async (ingredient: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?i=${ingredient}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching recipes by ingredient: ${error}`);
  }
};

export const searchRecipes = async (query: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Error searching recipes: ${error}`);
  }
};
