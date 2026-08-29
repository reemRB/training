import { TestBed } from '@angular/core/testing';
import { QuoteService } from './quote.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('QuoteService', () => {
  let service: QuoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(QuoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a random quote', () => {
    // ARRANGE — set up your FAKE data
    const mockQuote = { id: 1, quote: 'Test Quote', author: 'Test Author' };
    // ACT — CALL the thing you're TESTING butt it doesn't do anything cause no new value is there
    service.getRandomQuote().subscribe((quote) => {
      expect(quote).toEqual(mockQuote);
    });
    // VERIFY THE REQUEST - Confirm the right call was made by checking "GET"
    // Expect One -- EXACTLY ONE HTTP request made to THIS url
    const req = httpMock.expectOne('https://dummyjson.com/quotes/random');
    expect(req.request.method).toBe('GET');
    // ASSERTION
    req.flush(mockQuote);
  });

  // ! This is not needed because error is not implemented on the get method
  it('should return an error when the quote', () => {
    service.getRandomQuote().subscribe({
      next: () => fail('expected an error to be thrown'),
      error: (error) => {
        expect(error).toBeDefined();
      },
    });
    const req = httpMock.expectOne('https://dummyjson.com/quotes/random');
    expect(req.request.method).toBe('GET');
    req.error(new ProgressEvent('error'));
  });
});
