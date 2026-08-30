export interface Meal {
  id: string;
  title: string;
  category: string;
  country: string;
  instructions: string;
  thumbnail: string;
}

export interface RawMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strCountry: string;
  strInstructions: string;
  strMealThumb: string;
}
export interface RawMealResponse {
  meals: RawMeal[] | null;
}
