import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meal Recipes",
  description:
    "Discover a wide variety of easy and delicious recipes for every taste and skill level. Whether you're an experienced chef or a beginner, our site offers step-by-step instructions to help you create mouth-watering meals at home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
