import { useState } from "react";
import { PiChefHat } from "react-icons/pi";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white fixed top-0 w-full z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a
              href="#home"
              className="transition-transform transform hover:scale-110"
            >
              <PiChefHat className="w-12 h-12 text-[#b5838d] cursor-pointer" />
            </a>
          </div>

          {/* Barre de recherche */}
          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>

          {/* Navigation principale */}
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    href="#home"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#category"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    Category
                  </a>
                </li>
                <li>
                  <a
                    href="#ingredients"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    Ingredients
                  </a>
                </li>
                <li>
                  <a
                    href="#random-recipe"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    Recipes
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/search?q=blog+culinaire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Bouton pour ouvrir le menu mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <nav
            aria-label="Global"
            className="md:hidden bg-white w-full mt-2 border-t border-gray-200"
          >
            <ul className="flex flex-col items-center gap-4 py-4 text-sm">
              <li>
                <a
                  href="#home"
                  className="block text-gray-500 hover:text-gray-500/75"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#category"
                  className="block text-gray-500 hover:text-gray-500/75"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Category
                </a>
              </li>
              <li>
                <a
                  href="#ingredients"
                  className="block text-gray-500 hover:text-gray-500/75"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ingredients
                </a>
              </li>
              <li>
                <a
                  href="#random-recipe"
                  className="block text-gray-500 hover:text-gray-500/75"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/search?q=blog+culinaire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-500 hover:text-gray-500/75"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#footer"
                  className="block text-gray-500 hover:text-gray-500/75"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li className="w-full px-4">
                <SearchBar />
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
