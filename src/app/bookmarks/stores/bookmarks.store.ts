import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Bookmark } from '../services/bookmark.interface';
import { BookmarkService } from '../services/bookmark.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';

export interface BookmarkState {
  bookmarks: Bookmark[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: BookmarkState = {
  bookmarks: [],
  isLoading: false,
  error: null,
};

export const BookmarkStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((myStore, bookmarkService = inject(BookmarkService)) => ({
    loadBookmark: rxMethod<void>(
      pipe(
        tap(() => patchState(myStore, { isLoading: true, error: null })),
        switchMap(() => {
          return bookmarkService.getBookmarks().pipe(
            tap((bookmarks) =>
              patchState(myStore, {
                isLoading: false,
                bookmarks,
              }),
            ),
            catchError(() => {
              patchState(myStore, {
                isLoading: false,
                error: 'Error loading bookmarks',
              });
              return of(null);
            }),
          );
        }),
      ),
    ),
    removeBookmark: rxMethod<number>(
      pipe(
        tap(() => patchState(myStore, { isLoading: true, error: null })),
        switchMap((bookmarkId) => {
          return bookmarkService.removeBookmark(bookmarkId).pipe(
            tap(() => {
              const updatedBookmarks = myStore.bookmarks().filter((bookmark) => {
                return bookmark.id !== bookmarkId;
              });
              patchState(myStore, {
                isLoading: false,
                bookmarks: updatedBookmarks,
              });
            }),
            catchError(() => {
              patchState(myStore, {
                isLoading: false,
                error: 'error removing bookmark',
              });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);
