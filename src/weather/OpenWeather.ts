import axios from 'axios';
import providers from './providers';
import { Weather } from './Weather';
import { weatherOutputResource } from './weather.dto';

export class OpenWeather implements Weather {
  async getWeather(lon: number, lat: number): Promise<any> {
    const url = providers['openWeather']
      .replace('{lon}', lon.toString())
      .replace('{lat}', lat.toString());

    const weather = await axios.get(url);

    const data: weatherOutputResource = {
      lon,
      lat,
      weather: {
        main: weather.data.main.temp,
        description: weather.data.weather[0].description,
        icon: weather.data.weather[0].icon,
      },
    };

    return data;
  }
}
