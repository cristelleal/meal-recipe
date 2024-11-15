import { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logo = "/recipe_logo.jpg";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <div className="transition-transform transform hover:scale-110">
              <Image
                src={logo}
                alt="logo"
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
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Recipes
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
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
            className={`md:hidden transition-transform transform ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <ul className="flex flex-col items-center gap-6 text-sm mt-4">
              <li>
                <a
                  className="block text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="block text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  className="block text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  className="block text-gray-500 transition hover:text-gray-500/75"
                  href="#"
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
