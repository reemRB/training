import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Weather } from './weather.interface';
import { WeatherService } from './weather.service';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface WeatherState {
  weatherData: Weather | null;
  isLoading: boolean;
  error: string | null;
}

const initialWeatherState: WeatherState = {
  weatherData: null,
  isLoading: false,
  error: null,
};

export const WeatherStore = signalStore(
  { providedIn: 'root' },
  withState(initialWeatherState),
  withComputed(({ weatherData }) => ({
    temperatureLabel: computed(() => {
      const data = weatherData();
      if (data) {
        if (data.current_weather.temperature < 10) {
          return 'Cold';
        }
        if (data.current_weather.temperature > 10 && data.current_weather.temperature < 25) {
          return 'Mild';
        }
        return 'Hot';
      }
      return null;
    }),
  })),
  withMethods((myStore, weatherService = inject(WeatherService)) => ({
    loadWeather: rxMethod<{ lon: number; lat: number }>(
      pipe(
        tap(() => patchState(myStore, { isLoading: true, error: null })),
        switchMap(({ lon, lat }) => {
          return weatherService.getCurrentWeather({ lon, lat }).pipe(
            tap((data) => patchState(myStore, { isLoading: false, weatherData: data })),
            catchError(() => {
              patchState(myStore, { error: 'error getting weather data', isLoading: false });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);
