import Image from "next/image";
import { MealModalProps } from "../interfaces/mealModalProps.interface";

const MealModal: React.FC<MealModalProps> = ({ meal, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg h-[80%] sm:h-[70%] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="p-6 h-full flex flex-col">
          <Image
            src={meal.strMealThumb}
            height={300}
            width={300}
            alt={meal.strMeal}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="mt-4 text-lg font-bold">{meal.strMeal}</h3>
          <h2 className="text-sm text-gray-500">Category: {meal.strCategory}</h2>
          <p className="mt-2 text-gray-700 text-sm overflow-y-auto h-full">
            {meal.strInstructions}
          </p>
          {meal.strYoutube && (
            <div className="mt-4">
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealModal;