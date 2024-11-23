"use client";
import { useEffect, useState } from "react";
import MealCard from "../components/MealCard";
import Modal from "../components/Modal";
import { MealInterface } from "../interfaces/meal.interface";
import { getRandomRecipe } from "../services/api";
import { PiChefHat } from "react-icons/pi";

const HomePage: React.FC = () => {
  const [meals, setMeals] = useState<MealInterface[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<MealInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const numberOfMealDisplayed = 6;

  useEffect(() => {
    const getDataMeals = async () => {
      const fetchMeal = async () => {
        const data = await getRandomRecipe();
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
    <section className="mt-[115px]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <header>
          <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-bold text-gray-900">Meal Recipes</h2>
          </div>
          <p className="mt-4 max-w-md text-gray-500">
            Discover a wide variety of easy and delicious recipes for every
            taste and skill level. Whether you&apos;re an experienced chef or a
            beginner, our site offers step-by-step instructions to help you
            create mouth-watering meals at home.
          </p>
        </header>

        <div className="mt-8">
          <p className="text-xs text-gray-500 italic">
            Check out {numberOfMealDisplayed} random recipes
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} onClick={openModal} />
          ))}
        </div>

        {isModalOpen && selectedMeal && (
          <Modal meal={selectedMeal} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default HomePage;
