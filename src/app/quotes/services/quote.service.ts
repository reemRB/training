import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quote } from './quote.interface';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private baseURl = 'https://dummyjson.com/quotes/random';

  private http = inject(HttpClient);

  constructor() { }

  public getRandomQuote(): Observable<Quote>{
    return this.http.get<Quote>(`${this.baseURl}`);
  }
}
