export interface Weather {
  getWeather(lon: number, lat: number): Promise<any>;
}
