import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Meal, RawMealResponse } from './recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  private http = inject(HttpClient);
  constructor() {}

  public searchMeals(query: string | null): Observable<Meal[]> {
    return this.http.get<RawMealResponse>(`${this.baseUrl}/search.php?s=${query}`).pipe(
      map((response) => {
        if (!response.meals) {
          return [];
        }
        return response.meals.map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          category: meal.strCategory,
          country: meal.strCountry,
          instructions: meal.strInstructions,
          thumbnail: meal.strMealThumb,
        }));
      }),
    );
  }
}
