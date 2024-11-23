import { useEffect, useState } from "react";
import { Ingredient } from "../interfaces/ingredients.interface";
import { MealInterface } from "../interfaces/meal.interface";
import {
  getIngredients,
  getRecipesByIngredient,
  getRecipeById,
} from "../services/api";
import MealModal from "../components/MealModal";
import IngredientsModal from "./IngredientsModal";

const Ingredients = () => {
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [visibleIngredients, setVisibleIngredients] = useState<Ingredient[]>(
    []
  );
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
    null
  );
  const [meals, setMeals] = useState<MealInterface[]>([]);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealInterface | null>(null);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [ingredientsToShow, setIngredientsToShow] = useState(8);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getIngredients();
        setAllIngredients(data.meals);
        setVisibleIngredients(data.meals.slice(0, ingredientsToShow));
      } catch (error) {
        throw new Error(`Error fetching ingredients: ${error}`);
      }
    };

    fetchIngredients();
  }, [ingredientsToShow]);

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredient(ingredient);
    fetchMealsByIngredient(ingredient);
    setIsIngredientModalOpen(true);
  };

  const fetchMealsByIngredient = async (ingredient: string) => {
    try {
      const data = await getRecipesByIngredient(ingredient);
      setMeals(data.meals);
    } catch (error) {
      throw new Error(`Error fetching meals by ingredient: ${error}`);
    }
  };

  const openMealModal = async (mealId: string) => {
    try {
      const data = await getRecipeById(mealId);
      setSelectedMeal(data.meals[0]);
      setIsMealModalOpen(true);
    } catch (error) {
      throw new Error(`Error fetching meal details: ${error}`);
    }
  };

  const closeIngredientModal = () => {
    setIsIngredientModalOpen(false);
    setSelectedIngredient(null);
    setMeals([]);
  };

  const closeMealModal = () => {
    setIsMealModalOpen(false);
    setSelectedMeal(null);
  };

  const loadMoreIngredients = () => {
    const nextToShow = ingredientsToShow + 20;
    setIngredientsToShow(nextToShow);
    setVisibleIngredients(allIngredients.slice(0, nextToShow));
  };

  return (
    <section className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
  <div className="mt-8 text-center">
    <h1 className="text-2xl font-semibold mb-6 text-gray-800">Ingredients</h1>
    <ul className="flex flex-wrap justify-center gap-3">
      {visibleIngredients.map((ingredient) => (
        <li key={ingredient.strIngredient}>
          <button
            className="px-5 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => handleIngredientClick(ingredient.strIngredient)}
          >
            {ingredient.strIngredient}
          </button>
        </li>
      ))}
    </ul>

    {visibleIngredients.length < allIngredients.length && (
      <div className="mt-6 flex justify-center items-center">
        <div
          onClick={loadMoreIngredients}
          className="flex items-center justify-center cursor-pointer text-gray-700 bg-gray-100 rounded-full w-10 h-10 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          title="Load more ingredients"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </div>
    )}
  </div>

  {isIngredientModalOpen && (
    <IngredientsModal
      meals={meals}
      selectedIngredient={selectedIngredient}
      onClose={closeIngredientModal}
      onMealClick={openMealModal}
    />
  )}

  {isMealModalOpen && selectedMeal && (
    <MealModal meal={selectedMeal} onClose={closeMealModal} />
  )}
</section>
  );
};

export default Ingredients;
