import { IMeal, MealType } from './types';

export const mealTypes = [MealType.Breakfast, MealType.Dinner, MealType.Lunch];

const randomCalories = () => Math.floor(Math.random() * 490) + 10;
const randomProtein = () => Math.floor((Math.random() * 20 + 1) * 100) / 100;
const randomFat = () => Math.floor((Math.random() * 40 + 10) * 100) / 100;
const randomCarbs = () => Math.floor((Math.random() * 80 + 20) * 100) / 100;

const TOTAL_MEALS = 100;

export const data: IMeal[] = [...Array(TOTAL_MEALS)].map((_, i) => {
  const type = mealTypes[Math.floor(Math.random() * 4)];

  const name = `${type} meal ${String(i).padStart(
    String(TOTAL_MEALS).length,
    '0',
  )}`;

  return {
    id: i,
    name,
    type,
    calories: randomCalories(),
    protein: randomProtein(),
    fat: randomFat(),
    carbs: randomCarbs(),
    priority: 0,
  };
});
