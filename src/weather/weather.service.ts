import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
  async getWeather(lon: number, lat: number): Promise<any> {
    return 0;
  }
}
