import { TestBed } from '@angular/core/testing';
import { BookmarkStore } from './bookmarks.store';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('Bookmarks store', () => {
  let bookmarkStore: InstanceType<typeof BookmarkStore>;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    bookmarkStore = TestBed.inject(BookmarkStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('loads the bookmarks', () => {
    const rawApiResponse = {
      posts: [{ id: 1, title: 'Title book', body: 'some body', userId: 1 }],
    };
    const expectedBookmarks = [
      {
        id: 1,
        title: 'Title book',
        url: 'https://example.com/post/1',
        body: 'some body',
      },
    ];
    bookmarkStore.loadBookmark();
    const req = httpMock.expectOne('https://dummyjson.com/posts?limit=5');
    req.flush(rawApiResponse);
    expect(bookmarkStore.bookmarks()).toEqual(expectedBookmarks);
  });

  it('generate an error when the getBookmark fails', () => {
    bookmarkStore.loadBookmark();
    const req = httpMock.expectOne('https://dummyjson.com/posts?limit=5');
    req.error(new ProgressEvent(''));
    expect(bookmarkStore.isLoading()).toBe(false);
    // Expected error from store
    expect(bookmarkStore.error()).toEqual('Error loading bookmarks');
  });
});
