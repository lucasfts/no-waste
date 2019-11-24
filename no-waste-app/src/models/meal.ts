import { Food } from './food';

export interface Meal {
  food: Food;
  qtdProduced: number;
  qtdWasted: number;
  forecast: number;
}
