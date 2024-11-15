import Image from "next/image";
import { MealInterface } from "../interfaces/meal.interface";

interface MealCardProps {
  meal: MealInterface;
  onClick: (meal: MealInterface) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onClick }) => {
  return (
    <button
      onClick={() => onClick(meal)}
      className="group block overflow-hidden w-[200px] w-full"
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
  );
};

export default MealCard;