import { Food } from './food';

export interface Meal {
  _id: string;
  food: Food;
  qtdProduced: number;
  qtdWasted: number;
  forecast: number;
}
