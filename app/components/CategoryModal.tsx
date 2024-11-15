import Image from "next/image";
import { CategoryModalProps } from "../interfaces/categoryModalProps.interface";

const CategoryModal: React.FC<CategoryModalProps> = ({
  meals,
  selectedCategory,
  onClose,
  onMealClick,
}) => {
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
          <h2 className="text-lg font-bold text-center mb-4">
            Meals in {selectedCategory} category
          </h2>
          <div className="grid grid-cols-2 gap-4 overflow-y-auto h-full">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="cursor-pointer"
                onClick={() => onMealClick(meal.idMeal)}
              >
                <Image
                  src={meal.strMealThumb}
                  height={150}
                  width={150}
                  alt={meal.strMeal}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="text-sm font-medium mt-2 text-center">
                  {meal.strMeal}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;