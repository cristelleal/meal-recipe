import { useEffect, useState } from "react";
import Image from "next/image";
import { CategoryInterface } from "../interfaces/category.interface";
import { MealInterface } from "../interfaces/meal.interface";

const Category = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [meals, setMeals] = useState<MealInterface[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealInterface | null>(null);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);

  const fetchCategories = async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await response.json();
    setCategories(data.categories);
  };

  const fetchMealsByCategory = async (category: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await response.json();
    setMeals(data.meals);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    fetchMealsByCategory(category);
    setIsCategoryModalOpen(true);
  };

  const openMealModal = async (mealId: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    setSelectedMeal(data.meals[0]);
    setIsMealModalOpen(true);
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
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-6">
      <div className="mt-4">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <ul className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-4">
          {categories.map((category) => (
            <li key={category.idCategory}>
              <span className="inline-flex rounded-md border bg-white shadow-sm">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => handleCategoryClick(category.strCategory)}
                >
                  {category.strCategory}
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-4xl mx-auto rounded-lg shadow-lg relative max-h-[75vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeCategoryModal}
            >
              &times;
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Meals in {selectedCategory} category
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {meals.map((meal) => (
                  <div
                    key={meal.idMeal}
                    className="border p-2 rounded shadow cursor-pointer"
                    onClick={() => openMealModal(meal.idMeal)}
                  >
                    <Image
                      src={meal.strMealThumb}
                      height={200}
                      width={200}
                      alt={meal.strMeal}
                      className="w-full h-48 object-cover rounded"
                    />
                    <h3 className="text-lg font-medium mt-2">{meal.strMeal}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isMealModalOpen && selectedMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-4xl mx-auto rounded-lg shadow-lg relative max-h-[75vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeMealModal}
            >
              &times;
            </button>
            <div className="p-8">
              <Image
                src={selectedMeal.strMealThumb}
                height={400}
                width={400}
                alt={selectedMeal.strMeal}
                className="rounded-lg mx-auto"
              />
              <h2 className="text-2xl font-bold mt-4 text-center">
                {selectedMeal.strMeal}
              </h2>
              <p className="text-center text-gray-500 mt-2">
                Category: {selectedMeal.strCategory || selectedCategory}
              </p>
              <div className="mt-4">
                <h3 className="text-md font-semibold">Instructions:</h3>
                <p className="text-gray-700 mt-2">
                  {selectedMeal.strInstructions}
                </p>
              </div>
                <div className="mt-4">
                    <a
                    href={selectedMeal.strYoutube}
                    target="_blank"
                    className="text-blue-500 mt-2 text-xs"
                    >
                    Watch on YouTube
                    </a>
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Category;
