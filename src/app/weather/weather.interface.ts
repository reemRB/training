export interface Weather {
  latitude: number;
  longitude: number;
  timezone: string;
  current_weather: CurrentWeather;
}

interface CurrentWeather {
  time: string;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
}
