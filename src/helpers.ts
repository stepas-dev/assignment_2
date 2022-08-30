import { IMeal } from './types';

export const findOptimalMeals = (
  meals: IMeal[],
  targetCalories: number,
  minProtein: number,
  marginOfError: number,
): IMeal[] => {
  if (Math.abs(targetCalories) <= marginOfError && minProtein <= 0) {
    return [];
  }

  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];

    if (meal.calories < targetCalories) {
      const remainingTargetCalories = targetCalories - meal.calories;
      const remainingMeals = meals.slice(i + 1);
      const remainingMinProtein = minProtein - meal.protein;

      if (
        Math.abs(remainingTargetCalories) <= marginOfError &&
        remainingMinProtein <= 0
      ) {
        return [meal];
      }

      const additionalMeals = findOptimalMeals(
        remainingMeals,
        remainingTargetCalories,
        remainingMinProtein,
        marginOfError,
      );

      const optimalMeals = [meal, ...additionalMeals];

      const { currentSumOfCalories, currentSumOfProtein } = optimalMeals.reduce(
        (sum, meal) => ({
          currentSumOfCalories: sum.currentSumOfCalories + meal.calories,
          currentSumOfProtein: sum.currentSumOfProtein + meal.protein,
        }),
        { currentSumOfCalories: 0, currentSumOfProtein: 0 },
      );

      if (
        Math.abs(currentSumOfCalories - targetCalories) <= marginOfError &&
        currentSumOfProtein >= minProtein
      ) {
        return optimalMeals;
      }
    }
  }

  return [];
};
