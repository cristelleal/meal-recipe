import Image from "next/image";
import { ModalProps } from "../interfaces/modalProps.interface";

const Modal: React.FC<ModalProps> = ({ meal, onClose }) => {
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
          <div className="flex flex-col items-center">
            <Image
              src={meal.strMealThumb}
              height={150}
              width={150}
              alt={meal.strMeal}
              className="w-full h-32 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-lg font-bold text-center">
              {meal.strMeal}
            </h3>
            <h2 className="text-sm text-gray-500 text-center">
              Category: {meal.strCategory}
            </h2>
          </div>
          <div className="mt-4 flex-grow overflow-y-auto text-sm text-gray-700">
            <h3 className="font-semibold">Instructions:</h3>
            <p className="mt-2">{meal.strInstructions}</p>
          </div>
          {meal.strYoutube && (
            <div className="mt-4 flex justify-center">
              <a
                href={meal.strYoutube}
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
      </div>
    </div>
  );
};

export default Modal;
