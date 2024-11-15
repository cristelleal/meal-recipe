import { useEffect, useState } from "react";
import { CategoryInterface } from "../interfaces/category.interface";
import { MealInterface } from "../interfaces/meal.interface";
import { getCategories, getRecipesByCategory, getRecipeById } from "../services/api";
import CategoryModal from "../components/CategoryModal";
import MealModal from "../components/MealModal";

const Category = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [meals, setMeals] = useState<MealInterface[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealInterface | null>(null);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    fetchMealsByCategory(category);
    setIsCategoryModalOpen(true);
  };

  const fetchMealsByCategory = async (category: string) => {
    try {
      const data = await getRecipesByCategory(category);
      setMeals(data.meals);
    } catch (error) {
      console.error("Error fetching meals by category:", error);
    }
  };

  const openMealModal = async (mealId: string) => {
    try {
      const data = await getRecipeById(mealId);
      setSelectedMeal(data.meals[0]);
      setIsMealModalOpen(true);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setSelectedCategory(null);
    setMeals([]);
  };

  const closeMealModal = () => {
    setIsMealModalOpen(false);
    setSelectedMeal(null);
  };

  return (
    <section className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Categories</h1>
        <ul className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <li key={category.idCategory}>
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => handleCategoryClick(category.strCategory)}
              >
                {category.strCategory}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isCategoryModalOpen && (
        <CategoryModal
          meals={meals}
          selectedCategory={selectedCategory}
          onClose={closeCategoryModal}
          onMealClick={openMealModal}
        />
      )}

      {isMealModalOpen && selectedMeal && (
        <MealModal meal={selectedMeal} onClose={closeMealModal} />
      )}
    </section>
  );
};

export default Category;