import { MealInterface } from "./meal.interface";

export interface ModalProps {
  meal: MealInterface;
  onClose: () => void;
}
