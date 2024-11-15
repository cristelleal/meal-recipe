import Image from "next/image";
import { ModalProps } from "../interfaces/modalProps.interface";

const Modal: React.FC<ModalProps> = ({ meal, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white p-8 rounded-lg max-w-2xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <Image
          src={meal.strMealThumb}
          height={500}
          width={500}
          alt={meal.strMeal}
          className="max-h-[300px] w-full object-cover rounded-lg"
        />
        <h3 className="mt-4 text-lg font-bold">{meal.strMeal}</h3>
        <h2 className="text-sm text-gray-500">Category: {meal.strCategory}</h2>
        <p className="mt-2 text-gray-700 text-sm max-h-500 overflow-y-auto">
          {meal.strInstructions}
        </p>
      </div>
    </div>
  );
};

export default Modal;
