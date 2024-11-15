import { MealInterface } from "./meal.interface";

export interface MealModalProps {
  meal: MealInterface;
  onClose: () => void;
}
