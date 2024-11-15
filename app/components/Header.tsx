import { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logo = "/recipe_logo.jpg";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white fixed top-0 w-full z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <div className="transition-transform transform hover:scale-110">
              <Image
                src={logo}
                alt="cooking logo"
                height={120}
                width={130}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#home"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#recipes"
                  >
                    Recipes
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#blog"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#about"
                  >
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>

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

        {isMenuOpen && (
          <nav
            aria-label="Global"
            className="md:hidden bg-white w-full mt-2 border-t border-gray-200"
          >
            <ul className="flex flex-col items-center gap-4 py-4 text-sm">
              <li>
                <a
                  className="block text-gray-500 transition hover:text-gray-500/75"
                  href="#home"
                  onClick={toggleMenu}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="block text-gray-500 transition hover:text-gray-500/75"
                  href="#recipes"
                  onClick={toggleMenu}
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  className="block text-gray-500 transition hover:text-gray-500/75"
                  href="#blog"
                  onClick={toggleMenu}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  className="block text-gray-500 transition hover:text-gray-500/75"
                  href="#about"
                  onClick={toggleMenu}
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
