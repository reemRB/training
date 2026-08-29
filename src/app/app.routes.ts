import { Routes } from '@angular/router';
import { authGuard } from './core/guards/bookmark.guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./quotes/quote-widget/quote-widget.component').then(
        (m) => m.QuoteWidgetComponent,
      ),
  },
  {
    path: 'bookmarks',
    canActivate: [authGuard],    
    loadComponent: ()=> import ('./bookmarks/bookmark-widget/bookmark-widget.component').then(
      (m)=> m.BookmarkWidgetComponent
    )
  }
];

//default path with /quote
// not found