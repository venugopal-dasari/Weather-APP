import axios from 'axios';
import { WeatherData, SearchResult, WeatherError } from '../types/weather';

// Using OpenWeatherMap API for real-time weather data
const API_KEY = '4d8fb5b93d4af21d66a2948710284366'; // Free OpenWeatherMap API key for demo
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const ONECALL_URL = 'https://api.openweathermap.org/data/3.0';
const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0';

export class WeatherApiService {
  private static instance: WeatherApiService;
  
  private constructor() {}
  
  public static getInstance(): WeatherApiService {
    if (!WeatherApiService.instance) {
      WeatherApiService.instance = new WeatherApiService();
    }
    return WeatherApiService.instance;
  }

  // Mock weather data generator for demo purposes
  private generateMockWeatherData(city: string, country: string): WeatherData {
    const baseTemp = 20 + Math.random() * 20; // 20-40°C
    const humidity = 40 + Math.random() * 40; // 40-80%
    const windSpeed = 5 + Math.random() * 25; // 5-30 km/h
    
    const conditions = [
      { text: 'Sunny', icon: '☀️', code: 1000 },
      { text: 'Partly cloudy', icon: '⛅', code: 1003 },
      { text: 'Cloudy', icon: '☁️', code: 1006 },
      { text: 'Light rain', icon: '🌦️', code: 1063 },
      { text: 'Rain', icon: '🌧️', code: 1066 },
      { text: 'Thunderstorm', icon: '⛈️', code: 1087 }
    ];
    
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      location: {
        name: city,
        region: '',
        country: country,
        lat: 40.7128 + (Math.random() - 0.5) * 10,
        lon: -74.0060 + (Math.random() - 0.5) * 10,
        localtime: new Date().toISOString()
      },
      current: {
        temp_c: Math.round(baseTemp),
        temp_f: Math.round(baseTemp * 9/5 + 32),
        condition: condition,
        wind_kph: Math.round(windSpeed),
        wind_mph: Math.round(windSpeed * 0.621371),
        wind_degree: Math.floor(Math.random() * 360),
        wind_dir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
        pressure_mb: Math.round(1000 + Math.random() * 50),
        pressure_in: Math.round((1000 + Math.random() * 50) * 0.02953 * 100) / 100,
        precip_mm: Math.round(Math.random() * 10 * 100) / 100,
        precip_in: Math.round(Math.random() * 0.4 * 100) / 100,
        humidity: Math.round(humidity),
        cloud: Math.round(Math.random() * 100),
        feelslike_c: Math.round(baseTemp + (Math.random() - 0.5) * 5),
        feelslike_f: Math.round((baseTemp + (Math.random() - 0.5) * 5) * 9/5 + 32),
        vis_km: Math.round(5 + Math.random() * 15),
        vis_miles: Math.round((5 + Math.random() * 15) * 0.621371),
        uv: Math.round(1 + Math.random() * 10),
        gust_kph: Math.round(windSpeed + Math.random() * 10),
        gust_mph: Math.round((windSpeed + Math.random() * 10) * 0.621371),
        last_updated: new Date().toISOString()
      }
    };
  }

  async getCurrentWeather(city: string, country: string = ''): Promise<WeatherData> {
    try {
      // Get current weather data
      const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: `${city},${country}`,
          appid: API_KEY,
          units: 'metric'
        }
      });

      // Get 5-day forecast for more accurate data
      const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: `${city},${country}`,
          appid: API_KEY,
          units: 'metric'
        }
      });

      return this.transformWeatherData(weatherResponse.data, forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  async searchCities(query: string): Promise<SearchResult[]> {
    try {
      const response = await axios.get(`${GEOCODING_URL}/direct`, {
        params: {
          q: query,
          limit: 10,
          appid: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching cities:', error);
      return [];
    }
  }

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      // Get current weather data
      const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      });

      // Get 5-day forecast for more accurate data
      const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      });

      return this.transformWeatherData(weatherResponse.data, forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  private transformWeatherData(weatherData: any, forecastData?: any): WeatherData {
    // Get current timestamp with timezone consideration
    const currentTime = new Date();
    const localTime = new Date(currentTime.getTime() + (weatherData.timezone || 0) * 1000);
    
    // Transform OpenWeatherMap API response to our format
    return {
      location: {
        name: weatherData.name,
        region: weatherData.sys?.country || '',
        country: weatherData.sys?.country || '',
        lat: weatherData.coord?.lat || 0,
        lon: weatherData.coord?.lon || 0,
        localtime: localTime.toISOString()
      },
      current: {
        temp_c: Math.round(weatherData.main?.temp || 0),
        temp_f: Math.round((weatherData.main?.temp || 0) * 9/5 + 32),
        condition: {
          text: weatherData.weather?.[0]?.description || weatherData.weather?.[0]?.main || 'Unknown',
          icon: weatherData.weather?.[0]?.icon || '',
          code: weatherData.weather?.[0]?.id || 0
        },
        wind_kph: Math.round(weatherData.wind?.speed || 0),
        wind_mph: Math.round((weatherData.wind?.speed || 0) * 0.621371),
        wind_degree: weatherData.wind?.deg || 0,
        wind_dir: this.getWindDirection(weatherData.wind?.deg || 0),
        pressure_mb: Math.round(weatherData.main?.pressure || 0),
        pressure_in: Math.round((weatherData.main?.pressure || 0) * 0.02953 * 100) / 100,
        precip_mm: Math.round((weatherData.rain?.['1h'] || weatherData.rain?.['3h'] || 0) * 100) / 100,
        precip_in: Math.round(((weatherData.rain?.['1h'] || weatherData.rain?.['3h'] || 0) * 0.0393701) * 100) / 100,
        humidity: Math.round(weatherData.main?.humidity || 0),
        cloud: Math.round(weatherData.clouds?.all || 0),
        feelslike_c: Math.round(weatherData.main?.feels_like || 0),
        feelslike_f: Math.round((weatherData.main?.feels_like || 0) * 9/5 + 32),
        vis_km: weatherData.visibility ? Math.round(weatherData.visibility / 1000) : 10,
        vis_miles: weatherData.visibility ? Math.round(weatherData.visibility * 0.000621371) : 6,
        uv: this.calculateUVIndex(weatherData.main?.temp, weatherData.weather?.[0]?.id),
        gust_kph: Math.round(weatherData.wind?.gust || 0),
        gust_mph: Math.round((weatherData.wind?.gust || 0) * 0.621371),
        last_updated: localTime.toISOString()
      }
    };
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  private calculateUVIndex(temperature: number, weatherCode: number): number {
    // Calculate UV index based on temperature and weather conditions
    let uvIndex = 1;
    
    if (temperature > 25) {
      uvIndex = 6 + Math.floor((temperature - 25) / 5);
    } else if (temperature > 20) {
      uvIndex = 4 + Math.floor((temperature - 20) / 5);
    } else if (temperature > 15) {
      uvIndex = 2 + Math.floor((temperature - 15) / 5);
    }
    
    // Adjust based on weather conditions
    if (weatherCode >= 200 && weatherCode < 300) {
      // Thunderstorm - lower UV
      uvIndex = Math.max(1, uvIndex - 2);
    } else if (weatherCode >= 300 && weatherCode < 400) {
      // Drizzle - lower UV
      uvIndex = Math.max(1, uvIndex - 1);
    } else if (weatherCode >= 500 && weatherCode < 600) {
      // Rain - lower UV
      uvIndex = Math.max(1, uvIndex - 1);
    } else if (weatherCode >= 800 && weatherCode < 900) {
      // Clear sky - higher UV
      uvIndex = Math.min(11, uvIndex + 2);
    }
    
    return Math.min(11, Math.max(1, uvIndex));
  }
}

export const weatherApi = WeatherApiService.getInstance(); 