import { TestBed } from '@angular/core/testing';

import { BookmarkService } from './bookmark.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BookmarkService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should list the bookmarks with properties mapped', () => {
    const expectedBookmarks = [{
      id: 1,
      title: 'Title book',
      url: `https://example.com/post/1`,
      body: 'body',
    }];
    const rawBookmarks = {posts: expectedBookmarks};
 
    service.getBookmarks().subscribe((bookmarks)=>{
      expect(bookmarks).toEqual(expectedBookmarks);
    })
    const req = httpTestingController.expectOne('https://dummyjson.com/posts?limit=5');
    expect(req.request.method).toBe('GET');
    req.flush(rawBookmarks);
  });
});
