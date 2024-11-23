import { MealInterface } from "./meal.interface";

export interface IngredientModalProps {
  meals: MealInterface[];
  selectedIngredient: string | null;
  onClose: () => void;
  onMealClick: (mealId: string) => void;
}
