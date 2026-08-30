import { Component, OnDestroy, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Subject, catchError, debounceTime, of, switchMap, takeUntil, tap } from 'rxjs';
import { Meal } from '../recipe.interface';

@Component({
  selector: 'app-recipe-finder',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-finder.component.html',
  styleUrl: './recipe-finder.component.scss',
})
export class RecipeFinderComponent implements OnDestroy {
  private recipeService = inject(RecipeService);
  private destroyed$ = new Subject<void>();
  public search = new FormControl('');
  public isLoading = signal(false);
  public error = signal<string | null>(null);
  public meals = signal<Meal[]>([]);
  constructor() {
    this.search.valueChanges
      .pipe(
        debounceTime(400),
        tap(() => {
          this.error.set(null);
          this.isLoading.set(true);
        }),
        switchMap((value) => {
          return this.recipeService.searchMeals(value).pipe(
            catchError((error) => {
              this.isLoading.set(false);
              this.error.set(`Error: ${error}`);
              return of([]);
            }),
          );
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe((response) => {
        this.meals.set(response);
        this.isLoading.set(false);
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
