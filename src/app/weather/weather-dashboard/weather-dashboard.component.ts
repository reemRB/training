import { Component, inject } from '@angular/core';
import { WeatherStore } from '../weather.store';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss',
})
export class WeatherDashboardComponent {
  public weatherStore = inject(WeatherStore);

  public getWeatherData(args: { lon: number; lat: number }) {
    this.weatherStore.loadWeather({ lon: args.lon, lat: args.lat });
  }
}
