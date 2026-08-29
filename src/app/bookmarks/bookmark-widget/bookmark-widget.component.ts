import { Component, inject, OnInit } from '@angular/core';
import { BookmarkStore } from '../stores/bookmarks.store';

@Component({
  selector: 'app-bookmark-widget',
  standalone: true,
  imports: [],
  templateUrl: './bookmark-widget.component.html',
  styleUrl: './bookmark-widget.component.scss'
})
export class BookmarkWidgetComponent implements OnInit{
  public bookmarkStore = inject(BookmarkStore);
  ngOnInit(): void {
    this.bookmarkStore.loadBookmark();
  }

  

}
