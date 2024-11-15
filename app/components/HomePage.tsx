"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MealInterface } from "../interfaces/meal.interface";

const HomePage = () => {
  const [meals, setMeals] = useState<MealInterface[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<MealInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const numberOfMealDisplayed = 6;

  useEffect(() => {
    const getDataMeals = async () => {
      const fetchMeal = async () => {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        const data = await response.json();
        return data.meals;
      };

      const mealsArray = await Promise.all(
        Array.from({ length: numberOfMealDisplayed }, fetchMeal)
      );

      setMeals(mealsArray.flat());
    };

    getDataMeals();
  }, []);

  const openModal = (meal: MealInterface) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="mt-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Meal Recipes
            </h2>

            <p className="mt-4 max-w-md text-gray-500 pr-4">
              Discover a wide variety of easy and delicious recipes for every
              taste and skill level. Whether you&apos;re an experienced chef or
              a beginner, our site offers step-by-step instructions to help you
              create mouth-watering meals at home. Enjoy the joy of cooking with
              simple and accessible recipes
            </p>
          </header>

          <div className="mt-8">
            <p className="text-xs text-gray-500 italic">
              Check out {numberOfMealDisplayed} random recipes
            </p>
          </div>

          <ul className="mt-8 flex gap-4 overflow-x-auto">
            {meals.map((meal) => (
              <li key={meal.idMeal} className="flex-shrink-0">
                <button
                  onClick={() => openModal(meal)}
                  className="group block overflow-hidden w-[200px]"
                >
                  <Image
                    src={meal.strMealThumb}
                    height={200}
                    width={200}
                    alt={meal.strMeal}
                    className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-105 rounded-sm"
                  />

                  <div className="relative bg-white pt-3">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {meal.strMeal}
                    </h3>

                    <p className="mt-2 mb-12">
                      <span className="text-gray-400 text-xs">See more</span>
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {isModalOpen && selectedMeal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg max-w-2xl">
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                <Image
                  src={selectedMeal.strMealThumb}
                  height={500}
                  width={500}
                  alt={selectedMeal.strMeal}
                  className="max-h-[300px] w-full object-cover"
                />
                <h3 className="mt-4 text-lg font-bold">
                  {selectedMeal.strMeal}
                </h3>
                <h2 className="text-sm text-gray-500">
                  Category : {selectedMeal.strCategory}
                </h2>
                <p className="mt-2 text-gray-700 text-sm max-h-500">
                  {selectedMeal.strInstructions}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
