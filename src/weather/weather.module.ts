import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { GovWeather } from './GovWeather';
import { WeatherService } from './weather.service';
import { OpenWeather } from './OpenWeather';

@Module({
  controllers: [WeatherController],
  providers: [
    {
      provide: WeatherService,
      useClass: OpenWeather,
    },
  ],
})
export class WeatherModule {}
