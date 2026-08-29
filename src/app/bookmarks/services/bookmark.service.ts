import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Bookmark, DummyJsonPostsResponse } from './bookmark.interface';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private http = inject(HttpClient);
  private baseurl = 'https://dummyjson.com/posts'


  constructor() { }

  public getBookmarks(): Observable<Bookmark[]>{
    return this.http.get<DummyJsonPostsResponse>(`${this.baseurl}?limit=5`).pipe(
      map((response)=>
        response.posts.map((post)=>({
          id: post.id,
          title: post.title,
          body: post.body,
          url: `https://example.com/post/${post.id}`,
          
        }))
      )
    )
  }

  public removeBookmark(bookmarkId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseurl}/${bookmarkId}`)
  }
}
