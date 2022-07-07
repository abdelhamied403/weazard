import axios from 'axios';
import providers from './providers';
import { Weather } from './Weather';
import { weatherOutputResource } from './weather.dto';

export class GovWeather implements Weather {
  async getWeather(lon: number, lat: number): Promise<any> {
    const url = providers['govWeather']
      .replace('{lon}', lon.toString())
      .replace('{lat}', lat.toString());

    const grid = await axios.get(url);
    const {
      properties: { gridX, gridY },
    } = grid.data;

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
