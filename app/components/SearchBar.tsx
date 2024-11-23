import { useState, useEffect } from "react";
import { searchRecipes, getRecipeById } from "../services/api";
import MealModal from "./MealModal";
import { MealInterface } from "../interfaces/meal.interface";

const SearchBar = () => {
  const [searchTerm, clearSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<MealInterface[]>([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const fetchSuggestions = async (querySearch: string) => {
    if (!querySearch.trim()) {
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
      return;
    }

    try {
      const results = await searchRecipes(querySearch);

      if (results && results.meals) {
        setSuggestions(results.meals.slice(0, 5));
        setActiveSuggestionIndex(-1);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      throw new Error(`Error fetching suggestions: ${error}`);
    }
  };

  const fetchRecipe = async (idMeal: string) => {
    try {
      const data = await getRecipeById(idMeal);
      if (data && data.meals) {
        setSelectedMeal(data.meals[0]);
        setIsModalOpen(true);
        setSuggestions([]);
        clearSearchTerm("");
      }
    } catch (error) {
      throw new Error(`Error fetching recipe details: ${error}`);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
      fetchRecipe(suggestions[activeSuggestionIndex].idMeal);
    } else if (searchTerm.trim()) {
      fetchSuggestions(searchTerm);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 200);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const { key } = e;

    if (key === "ArrowDown" || key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        key === "ArrowDown"
          ? (prev + 1) % suggestions.length
          : (prev - 1 + suggestions.length) % suggestions.length
      );
    }

    if (key === "Enter") {
      e.preventDefault();
      handleSearch(e);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  return (
    <div className="relative flex-1 max-w-lg mx-auto">
      <form
        onSubmit={handleSearch}
        className="w-full flex items-center relative"
        onKeyDown={handleKeyDown}
      >
        <input
          type="text"
          placeholder="Search for a meal"
          value={searchTerm}
          onChange={(e) => clearSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
        />
        <button
          type="submit"
          className="absolute right-4 text-gray-500 hover:text-gray-700"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#b5838d"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 4.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM21 21l-4.35-4.35"
            />
          </svg>
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.idMeal}
              className={`px-4 py-2 cursor-pointer text-sm ${
                index === activeSuggestionIndex
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => fetchRecipe(suggestion.idMeal)}
            >
              {suggestion.strMeal}
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && selectedMeal && (
        <MealModal meal={selectedMeal} onClose={closeModal} />
      )}
    </div>
  );
};

export default SearchBar;
