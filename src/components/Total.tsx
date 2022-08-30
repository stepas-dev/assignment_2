import { IPlan, IMeal } from '../types';

interface IProps {
  plan: IPlan;
}

export const Total: React.FC<IProps> = ({ plan }) => {
  const { totalCalories, totalProtein, totalCarbs, totalFat } = Object.values(
    plan,
  ).reduce(
    (acc, meals: IMeal[]) => {
      const { calories, protein, carbs, fat } = meals.reduce(
        (accumulator, meal) => {
          accumulator.calories += meal.calories;
          accumulator.protein += meal.protein;
          accumulator.carbs += meal.carbs;
          accumulator.fat += meal.fat;
          return accumulator;
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 },
      );

      return {
        totalCalories: acc.totalCalories + calories,
        totalProtein: acc.totalProtein + protein,
        totalCarbs: acc.totalCarbs + carbs,
        totalFat: acc.totalFat + fat,
      };
    },
    { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 },
  );

  return (
    <div>
      <div>
        ================================================================
      </div>
      <div>Total</div>
      <div>
        <div>Calories: {totalCalories}</div>
        <div>Protein: {totalProtein.toFixed(2)}</div>
        <div>Carbs: {totalCarbs.toFixed(2)}</div>
        <div>Fat: {totalFat.toFixed(2)}</div>
      </div>
    </div>
  );
};
