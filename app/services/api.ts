import { API_BASE_URL } from "../utils/constants";

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.php`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getRecipeById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    throw error;
  }
};

export const getRecipesByCategory = async (category: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    throw error;
  }
};

export const getRandomRecipe = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/random.php`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    throw error;
  }
};