import { IMeal } from '../types';

interface IProps {
  meals: IMeal[];
  mealType: string;
}

export const Plan: React.FC<IProps> = ({ meals, mealType }) => (
  <div>
    <div>================================================================</div>
    <div>{mealType}</div>
    {meals.map((meal, index) => (
      <div key={index}>
        <div>
          {meal.name} ({meal.calories} calories)
        </div>
      </div>
    ))}
  </div>
);
