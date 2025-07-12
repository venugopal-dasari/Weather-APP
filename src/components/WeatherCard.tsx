import React from "react";
import { motion } from "framer-motion";
import { WeatherData } from "../types/weather";
import {
  Thermometer,
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
} from "lucide-react";

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
      return <Sun className="weather-icon weather-clear" />;
    } else if (
      conditionLower.includes("partly cloudy") ||
      conditionLower.includes("partly")
    ) {
      return <Cloud className="weather-icon weather-partly-cloudy" />;
    } else if (
      conditionLower.includes("cloudy") ||
      conditionLower.includes("overcast")
    ) {
      return <Cloud className="weather-icon weather-cloudy" />;
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle")
    ) {
      return <CloudRain className="weather-icon weather-rain" />;
    } else if (
      conditionLower.includes("thunder") ||
      conditionLower.includes("storm")
    ) {
      return <CloudLightning className="weather-icon weather-thunderstorm" />;
    } else if (conditionLower.includes("snow")) {
      return <Cloud className="weather-icon weather-snow" />;
    } else if (
      conditionLower.includes("fog") ||
      conditionLower.includes("mist")
    ) {
      return <Cloud className="weather-icon weather-fog" />;
    } else if (conditionLower.includes("wind")) {
      return <Cloud className="weather-icon weather-wind" />;
    } else {
      return <Cloud className="weather-icon weather-clear" />;
    }
  };

  const getBackgroundGradient = (condition: string) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
      return "cold-gradient";
    } else if (
      conditionLower.includes("cloudy") ||
      conditionLower.includes("overcast")
    ) {
      return "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600";
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle")
    ) {
      return "bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-400";
    } else if (
      conditionLower.includes("thunder") ||
      conditionLower.includes("storm")
    ) {
      return "bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600";
    } else {
      return "cold-gradient";
    }
  };

  return (
    <motion.div
      className={`weather-card p-8 ${getBackgroundGradient(
        weatherData.current.condition.text
      )} text-white relative overflow-hidden`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 text-6xl">🌤️</div>
        <div className="absolute bottom-4 left-4 text-4xl">🌍</div>
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Temperature and Condition */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              {getWeatherIcon(weatherData.current.condition.text)}
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-2">
              {Math.round(weatherData.current.temp_c)}°
            </h1>

            <p className="text-2xl md:text-3xl font-semibold mb-2">
              {weatherData.current.condition.text}
            </p>

            <div className="flex items-center justify-center md:justify-start text-lg opacity-90">
              <Thermometer className="w-5 h-5 mr-2" />
              <span>
                Feels like {Math.round(weatherData.current.feelslike_c)}°
              </span>
            </div>
          </div>

          {/* Right Side - Additional Info */}
          <div className="text-center md:text-right space-y-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2">Today's Range</h3>
              <div className="flex justify-center md:justify-end items-center space-x-4">
                <div>
                  <p className="text-sm opacity-80">High</p>
                  <p className="text-2xl font-bold">
                    {Math.round(weatherData.current.temp_c + 5)}°
                  </p>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div>
                  <p className="text-sm opacity-80">Low</p>
                  <p className="text-2xl font-bold">
                    {Math.round(weatherData.current.temp_c - 5)}°
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm opacity-80 mb-1">Humidity</p>
                <p className="text-xl font-bold">
                  {weatherData.current.humidity}%
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm opacity-80 mb-1">Wind</p>
                <p className="text-xl font-bold">
                  {weatherData.current.wind_kph} km/h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
