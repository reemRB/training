import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from './weather.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private http = inject(HttpClient);
  constructor() {}

  public getCurrentWeather(args: { lat: number; lon: number }): Observable<Weather> {
    return this.http.get<Weather>(
      `${this.baseUrl}?latitude=${args.lat}&longitude=${args.lon}&&current_weather=true`,
    );
  }
}
