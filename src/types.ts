export enum MealType {
  Breakfast = 'Breakfast',
  Dinner = 'Dinner',
  Lunch = 'Lunch',
}

export interface IMeal {
  id: number;
  name: string;
  type: MealType;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface IPlan {
  [MealType.Breakfast]?: IMeal[];
  [MealType.Lunch]?: IMeal[];
  [MealType.Dinner]?: IMeal[];
}
