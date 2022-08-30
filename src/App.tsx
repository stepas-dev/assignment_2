import React, { useState } from 'react';
import { data, mealTypes } from './data';

import { IPlan, IMeal, MealType } from './types';
import { findOptimalMeals } from './helpers';
import { Checkbox } from './components/Checkbox';
import { Plan } from './components/Plan';
import { Total } from './components/Total';

const EMPTY_PLAN = {
  [MealType.Breakfast]: [],
  [MealType.Lunch]: [],
  [MealType.Dinner]: [],
};

const MARGIN_OF_ERROR = 0.01;

const App = () => {
  const [calories, setCalories] = useState(1000);
  const [minProtein, setMinProtein] = useState(0);
  const [plan, setPlan] = useState<IPlan>(EMPTY_PLAN);
  const [enabledMeals, setEnabledMeals] = useState<MealType[]>([
    MealType.Breakfast,
  ]);

  const resetPlan = () => {
    setPlan(EMPTY_PLAN);
  };

  const handleCalculatePlanPress = () => {
    if (!enabledMeals.length) {
      resetPlan();
      return;
    }

    let newPlanMeals: IPlan = enabledMeals.reduce((acc, mealType) => {
      const targetCalories = calories / enabledMeals.length;
      const targetMinProtein = minProtein / enabledMeals.length;
      const meals = data.filter(meal => meal.type === mealType);

      const mealsWithRandomizedOrder = [...meals].sort(
        () => 0.5 - Math.random(),
      );

      const optimalMeals = findOptimalMeals(
        mealsWithRandomizedOrder,
        targetCalories,
        targetMinProtein,
        targetCalories * MARGIN_OF_ERROR,
      );

      optimalMeals.sort((a, b) => a.name.localeCompare(b.name));

      return { ...acc, [mealType]: optimalMeals };
    }, {});

    const totalPlanCalories = Object.values(newPlanMeals).reduce(
      (acc, meals) =>
        acc +
        meals.reduce(
          (accumulator: number, meal: IMeal) => accumulator + meal.calories,
          0,
        ),
      0,
    );

    const isValid =
      Math.abs(totalPlanCalories - calories) <= calories * MARGIN_OF_ERROR;

    const isNewPlanMealsEmpty = Object.values(newPlanMeals).every(
      (meals: IMeal[]) => !meals.length,
    );

    if (isNewPlanMealsEmpty || !isValid) {
      alert('No plan found for given parameters');
      newPlanMeals = {};
    }

    setPlan(oldPlanMeals => ({
      ...oldPlanMeals,
      ...newPlanMeals,
    }));
  };

  const handleChangeCaloriesCount = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    resetPlan();
    const { value } = event.target;
    setCalories(parseInt(value, 10));
  };

  const handleChangeMinProtein = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    resetPlan();
    const { value } = event.target;
    setMinProtein(parseInt(value, 10));
  };

  const handleCheckMealType = (mealType: MealType) => {
    resetPlan();
    const newEnabledMeals = [...enabledMeals];

    if (newEnabledMeals.includes(mealType)) {
      newEnabledMeals.splice(newEnabledMeals.indexOf(mealType), 1);
    } else {
      newEnabledMeals.push(mealType);
    }

    setEnabledMeals(newEnabledMeals);
  };

  const isPlanEmpty = Object.values(plan).every(meals => !meals.length);

  let planUI;

  if (!isPlanEmpty) {
    planUI = (
      <>
        {Object.entries(plan).map(([mealType, meals]) => {
          if (!meals.length) {
            return null;
          }

          return <Plan key={mealType} meals={meals} mealType={mealType} />;
        })}
        <Total plan={plan} />
      </>
    );
  }

  return (
    <div>
      <div>
        <div>Enter target calories count</div>
        <input
          type="number"
          min={100}
          value={calories}
          onChange={handleChangeCaloriesCount}
        />
      </div>
      <div>
        <div>Enter min protein</div>
        <input
          type="number"
          min={0}
          value={minProtein}
          onChange={handleChangeMinProtein}
        />
      </div>
      {mealTypes.map(mealType => (
        <div key={mealType}>
          <Checkbox
            label={mealType}
            isChecked={enabledMeals.includes(mealType)}
            onChange={() => handleCheckMealType(mealType)}
          />
        </div>
      ))}
      <button
        onClick={handleCalculatePlanPress}
        disabled={!enabledMeals.length}
      >
        Calculate plan
      </button>
      {planUI}
    </div>
  );
};

export default App;
