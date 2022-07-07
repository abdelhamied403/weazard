import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':lon/:lat')
  getWeather(@Param('lon') lon: number, @Param('lat') lat: number) {
    return this.weatherService.getWeather(lon, lat);
  }
}
