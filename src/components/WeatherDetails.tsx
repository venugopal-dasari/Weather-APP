import React from "react";
import { motion } from "framer-motion";
import { WeatherData } from "../types/weather";
import {
  MapPin,
  Clock,
  Cloud,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Sun,
} from "lucide-react";

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weatherData }) => {
  const getWindDirectionArrow = (direction: string) => {
    const directions: { [key: string]: string } = {
      N: "↑",
      NNE: "↑",
      NE: "↗",
      ENE: "↗",
      E: "→",
      ESE: "→",
      SE: "↘",
      SSE: "↘",
      S: "↓",
      SSW: "↓",
      SW: "↙",
      WSW: "↙",
      W: "←",
      WNW: "←",
      NW: "↖",
      NNW: "↖",
    };
    return directions[direction] || "→";
  };

  const getHumidityLevel = (humidity: number) => {
    if (humidity >= 80)
      return {
        level: "Very High",
        color: "text-red-600",
        bgColor: "bg-red-100",
      };
    if (humidity >= 60)
      return {
        level: "High",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
      };
    if (humidity >= 40)
      return {
        level: "Moderate",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    return { level: "Low", color: "text-green-600", bgColor: "bg-green-100" };
  };

  const getVisibilityLevel = (visibility: number) => {
    if (visibility >= 10)
      return {
        level: "Excellent",
        color: "text-green-600",
        bgColor: "bg-green-100",
      };
    if (visibility >= 5)
      return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (visibility >= 2)
      return {
        level: "Moderate",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    return { level: "Poor", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const humidityInfo = getHumidityLevel(weatherData.current.humidity);
  const visibilityInfo = getVisibilityLevel(weatherData.current.vis_km);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Location and Time Details */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="weather-card p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-400" />
          Location Details
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">City</span>
            <span className="font-semibold text-white">
              {weatherData.location.name}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Country</span>
            <span className="font-semibold text-white">
              {weatherData.location.country}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Coordinates</span>
            <span className="font-semibold text-white">
              {weatherData.location.lat.toFixed(2)},{" "}
              {weatherData.location.lon.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-white/80">Local Time</span>
            <span className="font-semibold text-white">
              {new Date(weatherData.location.localtime).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Wind and Atmospheric Details */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="weather-card p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Wind className="w-5 h-5 mr-2 text-green-400" />
          Wind & Atmospheric
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Wind Speed</span>
            <span className="font-semibold text-white">
              {weatherData.current.wind_kph} km/h (
              {weatherData.current.wind_mph} mph)
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Wind Direction</span>
            <div className="flex items-center">
              <span className="text-2xl mr-2 text-white">
                {getWindDirectionArrow(weatherData.current.wind_dir)}
              </span>
              <span className="font-semibold text-white">
                {weatherData.current.wind_dir} (
                {weatherData.current.wind_degree}°)
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Gust Speed</span>
            <span className="font-semibold text-white">
              {weatherData.current.gust_kph} km/h (
              {weatherData.current.gust_mph} mph)
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-white/80">Pressure</span>
            <span className="font-semibold text-white">
              {weatherData.current.pressure_mb} mb (
              {weatherData.current.pressure_in} inHg)
            </span>
          </div>
        </div>
      </motion.div>

      {/* Humidity and Precipitation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="weather-card p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Droplets className="w-5 h-5 mr-2 text-cyan-400" />
          Humidity & Precipitation
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Humidity</span>
            <div className="flex items-center">
              <span className="font-semibold text-white mr-2">
                {weatherData.current.humidity}%
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30`}
              >
                {humidityInfo.level}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Precipitation</span>
            <span className="font-semibold text-white">
              {weatherData.current.precip_mm} mm (
              {weatherData.current.precip_in} in)
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Cloud Cover</span>
            <span className="font-semibold text-white">
              {weatherData.current.cloud}%
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-white/80">UV Index</span>
            <span className="font-semibold text-white">
              {weatherData.current.uv}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Temperature and Visibility */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="weather-card p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Thermometer className="w-5 h-5 mr-2 text-red-400" />
          Temperature & Visibility
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Current Temp</span>
            <span className="font-semibold text-white">
              {Math.round(weatherData.current.temp_c)}°C (
              {Math.round(weatherData.current.temp_f)}°F)
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Feels Like</span>
            <span className="font-semibold text-white">
              {Math.round(weatherData.current.feelslike_c)}°C (
              {Math.round(weatherData.current.feelslike_f)}°F)
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/80">Visibility</span>
            <div className="flex items-center">
              <span className="font-semibold text-white mr-2">
                {weatherData.current.vis_km} km ({weatherData.current.vis_miles}{" "}
                miles)
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30`}
              >
                {visibilityInfo.level}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-white/80">Last Updated</span>
            <span className="font-semibold text-white">
              {new Date(weatherData.current.last_updated).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherDetails;
