"use client";
import Category from "./components/Category";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Ingredients from "./components/Ingredients";
import RandomRecipe from "./components/RandomRecipe";

export default function Home() {
  return (
    <div>
      <Header />

      <div id="home" className="mt-16">
        <HomePage />
      </div>

      <div id="random-recipe" className="mt-4">
        <RandomRecipe />
      </div>

      <div id="category-ingredients" className="mt-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div id="category">
            <Category />
          </div>
          <div id="ingredients">
            <Ingredients />
          </div>
        </div>
      </div>

      <div id="footer" className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
