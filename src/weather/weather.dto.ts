export interface weatherOutputResource {
  lon: number;
  lat: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  };
}
