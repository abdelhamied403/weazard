import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WeatherService } from './weather.service';
import { weatherOutputResource } from './weather.dto';

@Injectable()
export class WeatherServiceAdapter {
  private weatherService: WeatherService;
  constructor() {
    this.weatherService = new WeatherService();
  }

  async getOpenWeather(lon: number, lat: number) {
    const weather = await this.weatherService.getWeather(lon, lat);

    const data: weatherOutputResource = {
      lon,
      lat,
      weather: {
        main: weather.main.temp,
        description: weather.weather[0].description,
        icon: weather.weather[0].icon,
      },
    };

    return data;
  }

  async getGovWeather(lon: number, lat: number) {
    const grid = await this.weatherService.getWeather(lon, lat);
    const {
      properties: { gridX, gridY },
    } = grid;
    const weather = await axios.get(
      `https://api.weather.gov/gridpoints/TOP/${gridX},${gridY}/forecast`,
    );

    const data: weatherOutputResource = {
      lon,
      lat,
      weather: {
        main: weather.data.properties.periods[0].temperature,
        description: weather.data.properties.periods[0].detailedForecast,
        icon: weather.data.properties.periods[0].icon,
      },
    };

    return data;
  }
}
