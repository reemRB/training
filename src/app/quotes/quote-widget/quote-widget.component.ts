import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, of, Subject, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuoteService } from '../services/quote.service';
import { AuthService } from '../../bookmarks/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quote-widget',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quote-widget.component.html',
  styleUrl: './quote-widget.component.scss',
})
export class QuoteWidgetComponent implements OnInit{
  public isLoading = signal(false);
  public error = signal<string | null>(null);

  private quoteService = inject(QuoteService);
  public authService = inject(AuthService)

  // ! Option C with toSignal
  private fetchTrigger = new Subject<void>();
  public quote = toSignal(
    this.fetchTrigger.pipe(
      tap(() => { this.isLoading.set(true); this.error.set(null); }),
      switchMap(() =>
        this.quoteService.getRandomQuote().pipe(
          tap(() => this.isLoading.set(false)),
          catchError((err) => {
            this.isLoading.set(false);
            this.error.set('Failed to load quote');
            return of(null);
          })
        )
      )
    ),
    { initialValue: null }
  );

  public ngOnInit(): void {
    this.getQuote();
  }

  public getQuote(){
    this.fetchTrigger.next();
  }

  public login(){
    this.authService.login();
  }

  public logout(){
    this.authService.logout();
  }
}
