import { Routes } from '@angular/router';
import { authGuard } from './core/guards/bookmark.guards';
import { weatherGuard } from './core/guards/weather.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./quotes/quote-widget/quote-widget.component').then((m) => m.QuoteWidgetComponent),
  },
  {
    path: 'bookmarks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./bookmarks/bookmark-widget/bookmark-widget.component').then(
        (m) => m.BookmarkWidgetComponent,
      ),
  },
  {
    path: 'recipe-finder',
    loadComponent: () =>
      import('./recipes/recipe-finder/recipe-finder.component').then(
        (m) => m.RecipeFinderComponent,
      ),
  },
  {
    path: 'weather',
    canActivate: [weatherGuard],
    loadComponent: () =>
      import('./weather/weather-dashboard/weather-dashboard.component').then(
        (m) => m.WeatherDashboardComponent,
      ),
  },
];

//default path with /quote
// not found
