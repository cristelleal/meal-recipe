'use client';

import Category from "./components/Category";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <div>
      <Header />
      <HomePage />
      <Category />
      <Footer />
    </div>
  );
}
