import { useState } from "react";
import { MealInterface } from "../interfaces/meal.interface";
import { getRandomRecipe } from "../services/api";
import Image from "next/image";
import { HiOutlineRefresh } from "react-icons/hi";

const RandomRecipe: React.FC = () => {
  const [randomMeal, setRandomMeal] = useState<MealInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomMeal = async () => {
    try {
      setIsLoading(true);
      const data = await getRandomRecipe();
      setRandomMeal(data.meals[0]);
    } catch (error) {
      throw new Error(`Error fetching random meal: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = async () => {
    await fetchRandomMeal();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRandomMeal(null);
  };

  return (
    <section className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 text-center">
      <button
        onClick={openModal}
        className="inline-flex items-center justify-center gap-3 px-5 py-3 bg-white border border-gray-300 text-gray-700 text-base font-semibold rounded-md hover:bg-gray-100 hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        <HiOutlineRefresh className="w-5 h-5 text-[#b5838d]" />
        Generate Random Recipe
      </button>

      {isModalOpen && randomMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg h-[80%] sm:h-[70%] overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>

            <div className="p-6 h-full flex flex-col">
              <div className="flex flex-col items-center mb-4">
                <Image
                  src={randomMeal.strMealThumb}
                  width={200}
                  height={200}
                  alt={randomMeal.strMeal}
                  className="rounded-md object-cover shadow-sm"
                />
                <h2 className="text-lg font-bold text-center mt-4 text-gray-800">
                  {randomMeal.strMeal}
                </h2>
              </div>

              <div className="overflow-y-auto h-full text-sm text-gray-700">
                <p className="mb-4">
                  <strong>Category :</strong> {randomMeal.strCategory}
                </p>
                <div>
                  <h3 className="text-md font-semibold mb-2">Instructions :</h3>
                  <p className="text-gray-600">{randomMeal.strInstructions}</p>
                </div>
                {randomMeal.strYoutube && (
                  <div className="mt-4 flex justify-center">
                    <a
                      href={randomMeal.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-[#b5838d]/10 text-[#b04b5a] font-medium text-sm rounded-lg border border-[#b5838d]/50 hover:bg-[#b5838d]/20 hover:text-[#922f3d] transition-all focus:outline-none focus:ring-2 focus:ring-[#b5838d]/50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a2.866 2.866 0 0 0-2.014-2.02C19.736 3.636 12 3.636 12 3.636s-7.735 0-9.484.53a2.866 2.866 0 0 0-2.014 2.02C0 7.934 0 12 0 12s0 4.065.502 5.814c.24.971.993 1.729 1.964 1.98 1.75.53 9.534.53 9.534.53s7.735 0 9.484-.53a2.866 2.866 0 0 0 2.014-2.02C24 16.065 24 12 24 12s0-4.066-.502-5.814ZM9.545 15.568V8.432L15.455 12l-5.91 3.568Z" />
                      </svg>
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>

              <button
                onClick={fetchRandomMeal}
                disabled={isLoading}
                className={`mt-4 inline-flex items-center justify-center gap-3 px-6 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <HiOutlineRefresh className="w-4 h-4 text-[#b5838d]" />
                {isLoading ? "Loading..." : "Generate another recipe"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RandomRecipe;
