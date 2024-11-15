import { MealInterface } from "./meal.interface";

export interface CategoryModalProps {
  meals: MealInterface[];
  selectedCategory: string | null;
  onClose: () => void;
  onMealClick: (mealId: string) => void;
}
